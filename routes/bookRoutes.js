const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/displayAllBooks', bookController.getAllBooks);
router.post('/addBooks', bookController.addBooks);

module.exports = router;