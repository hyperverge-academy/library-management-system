const bookModel = require('../models/bookModel');
const resconst = require('../constants/db.constants');
const response = require('../constants/response.constants');

const getAllServiceBooks = async (bookId) => {
    return await bookModel.getAllBooks(bookId);
};


const addBookToDatabase  = async (bookData) => {
    try {
        const result = await bookModel.addNewBookToDatabase(bookData);
        return result;
    } catch (error) {
        console.error('Error adding a new book:', error);
        return { success: false, errorCode: 500, message: "Internal server error" };
    }
};

module.exports = { getAllServiceBooks , addBookToDatabase};