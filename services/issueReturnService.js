const issueReturnModel = require('../models/issueReturnModel');
const resConst = require("../constants/response.constants");

const getCurrentDate = () => {
    return new Date();
};

const issueBookToMember = async (issue, memberId, bookId) => {
    try {

        if (!issue.bookId || !issue.memberId || !issue.issueId || !issue.duration) {
            return resConst.fieldMissingError;
        } else {
            issue.issueDate = getCurrentDate();
            const returnDate = new Date(issue.issueDate);
            returnDate.setDate(returnDate.getDate() + parseInt(issue.duration));
            issue.returnDate = returnDate;

            return await issueReturnModel.issueBook(issue, memberId, bookId);
        }
    } catch (error) {
        console.error('Error issuing book:', error);
        return { success: false, errorCode: 500, message: 'Internal Server Error' };
    }
};

const returnBookToLibrary = async (issueId) => {
    try{
     return await issueReturnModel.returnBook(issueId);
    }
    catch (error) {
        console.error('Error returning book:', error);
        return resConst.internalServerError;
    }
};

module.exports = {issueBookToMember,returnBookToLibrary}