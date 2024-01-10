const express = require('express');
const router = express.Router();
const issueReturnController = require('../controllers/issueReturnController');

router.post('/issueBook', issueReturnController.issueBook);

module.exports = router;
