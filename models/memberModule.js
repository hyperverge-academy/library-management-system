const { MongoClient, ObjectId } = require("mongodb");
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
        console.log(membersArray);
        return resConst.viewAllMembers;
        

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
            memberId:userData.memberId,
        };

        const info = await collection.find({ "mobileNumber": convertRegisterData.mobileNumber }).toArray();

        if (info.length >= 1) {
            return resConst.registerError;
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

const deleteMember = async (memberId) => {
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(memberId)});
        if (result.deletedCount === 1) {
            return resConst.successfulDeletion;
        } else {
            return resConst.memberNotFound;
        }
    } catch (error) {
        console.error("Error deleting document:", error);
        return resConst.internalServerError;
    }
};


const editMemberDetails = async (memberId, updatedData) => {
    try {
        const filter = { _id: new ObjectId(memberId) };
        const updateDoc = { $set: updatedData };
        const result = await collection.updateOne(filter, updateDoc);
        if (result.matchedCount === 0) {
            return resConst.memberNotFound;
        } else if (result.modifiedCount === 1) {
            return resConst.successfulUpdate;
        } else {
            return resConst.internalServerError;
        }
    } catch (error) {
        console.error("Error updating member details:", error);
        return resConst.internalServerError;
    }
};

module.exports = { getAllMembers, saveMemberToDatabase, deleteMember, editMemberDetails };
