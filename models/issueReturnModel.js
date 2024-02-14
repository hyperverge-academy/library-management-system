const { MongoClient, ObjectId } = require("mongodb");
const dbConst = require("../constants/db.constants");
const resConst = require("../constants/response.constants");

const client = new MongoClient(dbConst.uri);

client.connect().then(() => {
    console.log("Connected successfully to the database");
    const db = client.db(dbConst.dbName);
    IssuedBooksCollection = db.collection(dbConst.issueReturnBooksCollection);
    MembersCollection = db.collection(dbConst.memberCollection);
    BooksCollection = db.collection(dbConst.bookCollection);
    
}).catch(err => console.log(err));

const issueBook = async (issueData, memberId, bookId) => {
    try {
        const filteredBook = {"bookId":bookId};
        const filteredMember = {"memberId": memberId};
        const member = await MembersCollection.findOne(filteredMember);
        const book = await BooksCollection.findOne(filteredBook);

        if (!member) {
            return resConst.memberNotFound;
        }

        if (!book) {
            return resConst.bookNotFound;
        }
        console.log(book.status)
        if (book.status !== 'available') {
            return resConst.booknotavailableforissuing;
        }
        book.status = 'issued';
        const bookUpdate = {$set:{"status":book.status}}
        const update = await BooksCollection.updateOne(filteredBook, bookUpdate);
        
        const result = await IssuedBooksCollection.insertOne(issueData);
        return resConst.successfulIssue;
        
    } catch (error) {
        console.error('Error issuing book:', error);
        return resConst.internalServerError;
    }
};


const updateBookStatus = async (bookId, status) => {
    try {
        await BooksCollection.updateOne(
            { bookId: bookId },
            { $set: { status: status } }
        );
    } catch (error) {
        console.error('Error updating book status:', error);
    }
};

const returnBook = async (issueId) => {
    try {
        const issuedBook = await IssuedBooksCollection.findOne({ issueId : issueId });

        if (!issuedBook) {
            return resConst.bookNotIssued;
        }

        const expectedReturnDate = new Date(issuedBook.returnDate);
        const actualReturnDate = new Date();
        console.log("Expected Return Date:", expectedReturnDate);
        console.log("Actual Return Date:", actualReturnDate);

        if (actualReturnDate > expectedReturnDate) {
            console.log(`The book is overdue `);
        } else if (actualReturnDate < expectedReturnDate) {
            console.log(`The book was returned early `);
        } else {
            console.log("The book was returned on time.");
        }
        
        await updateBookStatus(issuedBook.bookId, 'available');

        await IssuedBooksCollection.updateOne(
            { issueId : issueId },
            { $set: { returnDate: actualReturnDate } }
        );

        return resConst.returnBook;
    } catch (error) {
        console.error('Error returning book:', error);
        return resConst.internalServerError;
    }
};

module.exports = { issueBook, returnBook, updateBookStatus };
