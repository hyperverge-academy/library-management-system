const bookService = require('../services/bookService');

const getAllBooks = async (req, res) => {
    const bookId = req.params.id;
    const books = await bookService.getAllServiceBooks(bookId);
    res.send(books);
}

module.exports = {getAllBooks};
