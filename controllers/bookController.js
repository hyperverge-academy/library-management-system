const bookService = require('../services/bookService');

const getAllBooks = async (req, res) => {
    const bookId = req.params.id;
    const books = await bookService.getAllServiceBooks(bookId);
    res.send(books);
}

const addBooks = async(req, res) => {
    const bookData = req.body;
    const result = await bookService.addBookToDatabase(bookData);
    res.send(result);
}

const removeBooks = async(req, res) => {
    const bookId =  req.params.bookId;
    const result = await bookService.removeBookFromDatabase(bookId);
    res.send(result);
}

const editBookDetails = async (req, res) => {
    const bookId = req.params.id;
    const updatedData = req.body;

    const result = await bookService.editBookDetailsInDatabase(bookId, updatedData);
    res.send(result);
};


module.exports = {getAllBooks,addBooks,removeBooks,editBookDetails};