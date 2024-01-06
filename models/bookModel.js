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

module.exports = { getAllBooks };
