const issueReturnModel = require('../models/issueReturnModel');
const resConst = require("../constants/response.constants");


// const checkMemberExistence = async (memberId) => {
//     try {
//         const count = await MembersCollection.countDocuments({ _id: memberId });
//         return count > 0;
//     } catch (error) {
//         console.error('Error checking member existence:', error);
//         throw error; 
//     }
// };

// const checkBookExistence = async (bookId) => {
//     try {
//         const count = await BooksCollection.countDocuments({ _id: bookId });
//         return count > 0;
//     } catch (error) {
//         console.error('Error checking book existence:', error);
//         throw error; 
//     }
// };

// const issueBookToMember = async (memberId, bookId) => {
//     try {
//         const memberExists = await checkMemberExistence(memberId);
//         if (!memberExists) {
//             return { success: false, errorCode: 404, message: 'Member not found' };
//         }

//         const bookExists = await checkBookExistence(bookId);
//         if (!bookExists) {
//             return { success: false, errorCode: 404, message: 'Book not found' };
//         }

//         await issueTheBook(memberId, bookId);

//         return { success: true, message: 'Book issued successfully' };
//     } catch (error) {
//         console.error('Error issuing book:', error);
//         return { success: false, errorCode: 500, message: 'Internal Server Error' };
//     }
// };



const issueBookToMember = async (issue, memberId, bookId) => {
    try {

        if (!issue.bookId || !issue.memberId || !issue.issueDate || !issue.returnDate ||!issue.duration || !issue.issueId) {
            return resConst.fieldMissingError;
        } else {           
            return await issueReturnModel.issueBook(memberId, bookId);
        }
    } catch (error) {
        console.error('Error issuing book:', error);
        return { success: false, errorCode: 500, message: 'Internal Server Error' };
    }
};

module.exports = { issueBookToMember };

