const { MongoClient } = require("mongodb");
const dbConst = require("../constants/db.constants");
const resConst = require("../constants/response.constants")

let collection;
const client = new MongoClient(dbConst.uri);
client.connect().then(() => {
    console.log("Connected successfully to database");
    const db = client.db(dbConst.dbName);
    collection = db.collection(dbConst.memberCollection);
}).catch(err => console.log(err));


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

const saveMemberToDatabase = async (userData) => {
    try {
        const convertRegisterData = {
            fullName: userData.fullName,
            mobileNumber: parseInt(userData.mobileNumber),
            password: userData.password
        };

        const info = await collection.find({ "mobileNumber": convertRegisterData.mobileNumber }).toArray();

        if (info.length >= 1) {
            return resConst.loginDataExist;
        } else {
            const result = await collection.insertOne(convertRegisterData);
            console.log(result);
            return resConst.registerMessage;
        }
    } catch (error) {
        console.error("Error inserting document:", error);
        return resConst.internalServerError;
    }
};

module.exports = { getAllMembers , saveMemberToDatabase };