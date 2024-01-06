const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.use('/displayAllBooks', bookController.getAllBooks);

module.exports = router;