const issueReturnService = require('../services/issueReturnService');

const issueBook = async (req, res) => {
    const data = req.body;
    const memberId = req.params.memberId;
    const bookId = req.params.bookId; 
    const result = await issueReturnService.issueBookToMember(data,memberId, bookId);
    res.send(result);
};

const returnBook = async (req, res) => {
    const issueId = req.params.issueId;
    const result = await issueReturnService.returnBookToLibrary(issueId);
    res.send(result);
};

module.exports = { issueBook , returnBook };