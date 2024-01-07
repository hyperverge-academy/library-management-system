const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/displayAllBooks', bookController.getAllBooks);
router.post('/addBooks', bookController.addBooks);
router.delete('/removeBooks/:bookId', bookController.removeBooks);
router.put('/editBookDetails/:id', bookController.editBookDetails);

module.exports = router;