const { MongoClient , ObjectId, ConnectionClosedEvent } = require("mongodb");
const dbConst = require("../constants/db.constants");
const resConst = require("../constants/response.constants")

let collection;
const client = new MongoClient(dbConst.uri);

client.connect().then(() => {
    console.log("Connected successfully to the database");
    const db = client.db(dbConst.dbName);
    collection = db.collection(dbConst.bookCollection);
}).catch(err => console.log(err));

const getAllBooks = async () => {
    try {
        const books = await collection.find().toArray();
        console.log(books)
        return resConst.successfulBookListing;
    } catch (error) {
        console.error('Error retrieving books:', error);
        return [];
    }
    finally {
        await client.close();
    }
};

const addNewBookToDatabase = async (bookData) => {
    try {
        console.log("Checking for existing book with bookId:", bookData.bookId);
        const existingBook = await collection.findOne({ bookId: bookData.bookId });

        if (existingBook) {
            return resConst.bookExistsError;
        }

        const result = await collection.insertOne(bookData);

        if (result.insertedCount === 1) {
            return resConst.bookAddedSuccess;
        } 
        
    } catch (error) {
        console.error("Error adding a new book:", error);
        return { success: false, errorCode: 500, message: "Internal server error" };
    }
};

const deleteBook = async (bookId) => {

    const result = await collection.deleteOne({ _id: new ObjectId(bookId) });

    if (result.deletedCount === 1) {
        return resConst.successfullyDeletedBook;
    } else {
        return resConst.bookNotFound;
    }
};

const editBookDetails = async (bookId, updatedData) => {
    try {
        if (!ObjectId.isValid(bookId)) {
            return resConst.invalidObjectId;
        }

        const filter = { _id: new ObjectId(bookId) };
        const updateDoc = { $set: updatedData };
        const result = await collection.updateMany(filter, updateDoc);

        if (result.matchedCount === 0) {
            return resConst.bookNotFound;
        } else if (result.modifiedCount === 1) {
            return resConst. successfullyUpdated;
        } else {
            return resConst.internalServerError;
        }
    } catch (error) {
        console.error('Error updating book details:', error);
        return resConst.internalServerError;
    }
};


module.exports = { getAllBooks, addNewBookToDatabase, deleteBook,editBookDetails};
