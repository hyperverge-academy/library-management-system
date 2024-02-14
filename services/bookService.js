const bookModel = require('../models/bookModel');
const dbConst = require("../constants/db.constants");
const resConst = require("../constants/response.constants")
const response = require('../constants/response.constants');

const getAllServiceBooks = async (bookId) => {
    return await bookModel.getAllBooks(bookId);
};

const addBookToDatabase = async (bookData) => {
    try {
        const requiredFields = ["bookId", "status", "title", "author", "genre", "price"];
        if (requiredFields.some(field => !bookData[field])) {
            console.log("Field missing");
            return response.fieldMissingError;
        }

        console.log("Before saving to database");

        const result = await bookModel.addNewBookToDatabase(bookData);

        if (result === resConst.bookExistsError) {
            console.log("Book already exists");
            return response.bookExistsError;
        } else if (result === resConst.internalServerError) {
            console.error("Internal server error");
            return response.internalServerError;
        } else {
            console.log("After saving to database");
            return response.bookAddedSuccess;
        }

    } catch (error) {
        console.error('Error adding a new book:', error);
        return { success: false, errorCode: 500, message: "Internal server error" };
    }
};

const removeBookFromDatabase = async (bookId) =>{
    try{
        const result = await bookModel.deleteBook(bookId);

        console.log(result)

        if (result === response.bookNotFound) {
            return result;
        }
        return response.successfullyDeletedBook;
        
    } catch (error) {
        console.error('Error deleting book:', error);
        return response.internalServerError;
    }

};

const editBookDetailsInDatabase = async (bookId, updatedData) => {
    try {
        return await bookModel.editBookDetails(bookId, updatedData);
    } catch (error) {
        console.error('Error editing book details in the database:', error);
        return resConst.internalServerError;
    }
};

module.exports = { getAllServiceBooks , addBookToDatabase,removeBookFromDatabase,editBookDetailsInDatabase};