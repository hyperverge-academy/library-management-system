const { MongoClient , ObjectId } = require("mongodb");
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
        return books;
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
        if (!collection) {
            await connectToDatabase();
        }
        const existingBook = await collection.findOne({ title: bookData.bookId });

        if (existingBook) {
            return { success: false, errorCode: 409, message: "Book already exists" };
        }

        const result = await collection.insertOne(bookData);

        if (result.insertedCount === 1) {
            return { success: true, errorCode: 201, message: "Book added successfully" };
        } else {
            return { success: false, errorCode: 500, message: "Internal server error" };
        }
    } catch (error) {
        console.error("Error adding a new book:", error);
        return { success: false, errorCode: 500, message: "Internal server error" };
    }
};

// const deleteBook = async (bookId) => {
//     try {
//         if (!ObjectId.isValid(bookId)) {
//             return resConst.invalidObjectId;
//         }

//         await connectToDatabase();

//         const filter = { _id: new ObjectId(bookId) };
//         const result = await collection.deleteOne(filter);

//         if (result.deletedCount === 0) {
//             return resConst.bookNotFound;
//         }

//         console.log('Book deleted successfully');
//         return resConst.successfullyDeletedBook;
//     } catch (error) {
//         console.error('Error deleting book:', error);
//         return resConst.internalServerError;
//     } finally {
//         await client.close();
//     }
// };
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
        const result = await collection.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
            return resConst.bookNotFound;
        } else if (result.modifiedCount === 1) {
            return resConst.successfulUpdate;
        } else {
            return resConst.internalServerError;
        }
    } catch (error) {
        console.error('Error updating book details:', error);
        return resConst.internalServerError;
    }
};
module.exports = { getAllBooks, addNewBookToDatabase, deleteBook,editBookDetails};
