const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

router.get('/getAllMembers', memberController.getAllMembers);
router.post('/registration', memberController.addRegisterMember);
router.post('/login', memberController.loginMember);
router.delete('/deleteMember/:id', memberController.deleteMember);

module.exports = router;