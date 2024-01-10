const { MongoClient, ObjectId } = require("mongodb");
const dbConst = require("../constants/db.constants");
const resConst = require("../constants/response.constants");

const client = new MongoClient(dbConst.uri);

client.connect().then(() => {
    console.log("Connected successfully to the database");
    const db = client.db(dbConst.dbName);
    IssuedBooksCollection = db.collection(dbConst.issuedBooksCollection);
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

        if (book.status !== 'Available') {
            return resConst.booknotavailableforissuing;
        }
        book.status = 'Issued';
        const bookUpdate = {$set:{"status":book.status}}
        const update = await BooksCollection.updateOne(bookUpdate,filteredBook);
        
        const result = await IssuedBooksCollection.insertOne(issueData);
        
        if (result.insertedCount === 1) {
            return resConst.successfulIssue;
        } else {
            return resConst.issueingFailed;
        }
    } catch (error) {
        console.error('Error issuing book:', error);
        return resConst.internalServerError;
    }
};

module.exports = { issueBook};