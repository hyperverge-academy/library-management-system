const { MongoClient } = require("mongodb");
const dbConst = require("../constants/db.constants");

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
        const existingBook = await collection.findOne({ title: bookData.title });

        if (existingBook) {
            return { success: false, errorCode: 409, message: "Book already exists" };
        }

        const result = await collection.insertOne(bookData);

        if (result.insertedCount === 1) {
            return { success: false, errorCode: 500, message: "Internal server error" };
        } else {
            return { success: true, errorCode: 201, message: "Book added successfully" };
        }
    } catch (error) {
        console.error("Error adding a new book:", error);
        return { success: false, errorCode: 500, message: "Internal server error" };
    }
};

module.exports = { getAllBooks, addNewBookToDatabase};
