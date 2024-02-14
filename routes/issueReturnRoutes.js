const express = require('express');
const router = express.Router();
const issueReturnController = require('../controllers/issueReturnController');

router.post('/issueBook/:bookId/:memberId', issueReturnController.issueBook);
router.post('/returnBook/:issueId', issueReturnController.returnBook);

module.exports = router;