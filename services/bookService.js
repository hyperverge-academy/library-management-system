const bookModel = require('../models/bookModel');

const getAllServiceBooks = async (bookId) => {
    return await bookModel.getAllBooks(bookId);
};

module.exports = { getAllServiceBooks };