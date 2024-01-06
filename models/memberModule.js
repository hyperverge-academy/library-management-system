const { MongoClient } = require("mongodb");
const dbConst = require("../constants/db.constants");

let collection;
const client = new MongoClient(dbConst.uri);
client.connect().then(() => {
    console.log("Connected successfully to database");
    const db = client.db(dbConst.dbName);
    collection = db.collection(dbConst.memberCollection);
})
.catch(err => console.log(err));

const getAllMembers = async () => {
    const client = new MongoClient(dbConst.uri);

    try {
        const database = client.db(dbConst.dbName);
        const membersCollection = database.collection(dbConst.memberCollection);
        const allMembers = await membersCollection.find();
        const membersArray = [];

        for await (const doc of allMembers) {
            membersArray.push(doc);
        }

        return membersArray;
    } catch (error) {
        console.error('Error retrieving members:', error);
        return [];
    } finally {
        await client.close();
    }
};

module.exports = { getAllMembers };