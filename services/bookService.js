const bookModel = require('../models/bookModel');
const dbConst = require("../constants/db.constants");
const resConst = require("../constants/response.constants")
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

const removeBookFromDatabase = async (bookId) =>{
    try{
        const result = await bookModel.deleteBook(bookId);

        if (result === response.bookNotFound) {
            return result;
        }
        return response.successfullyDeletedBook;
    }catch (error) {
        console.error('Error deleting book:', error);
        return response.internalServerError;
    }

};

module.exports = { getAllServiceBooks , addBookToDatabase,removeBookFromDatabase};