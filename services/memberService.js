const memberModel = require('../models/memberModule');
const resconst = require('../constants/db.constants');
const response = require('../constants/response.constants');

const getServiceMember = async () => {
    const registered = await memberModel.getAllMembers();
    return registered;
};

const addMemberToDatabase = async (registerMember) => {
    try {
        if (!registerMember.fullName || !registerMember.mobileNumber || !registerMember.memberId) {
            console.log("Field missing");
            return response.fieldMissingError;
        }

        if (registerMember.mobileNumber.length !== 10) {
            console.log("Mobile and password error");
            return response.mobileAndPasswordError;            
        }
        console.log("Before saving to database");

        const result = await memberModel.saveMemberToDatabase(registerMember);
        console.log("After saving to database");
        console.log(result);
        return response.registerMessage;

    } catch (error) {
        console.error('Error adding member to the database:', error);
        return response.internalServerError;
    }
};

const deleteMemberFromDatabase = async (memberId) => {
    try {
        const result = await memberModel.deleteMember(memberId);
        return result;
    } catch (error) {
        console.error('Error deleting member from the database:', error);
        return response.internalServerError;
    }
};

const editMemberDetailsInDatabase = async (memberId, updatedData) => {
    try {
        if (updatedData.mobileNumber && updatedData.mobileNumber.length !== 10) {
            console.log("Mobile number should be 10 digits");
            return response.mobileAndPasswordError;
        }
        if (updatedData.password && updatedData.password.length !== 8) {
            console.log("Password length should be 8 digits");
            return response.passwordError;
        }
        const result = await memberModel.editMemberDetails(memberId, updatedData);
        return result;
    } catch (error) {
        console.error('Error editing member details in the database:', error);
        return response.internalServerError;
    }
};
module.exports = { getServiceMember , addMemberToDatabase,deleteMemberFromDatabase,editMemberDetailsInDatabase};



