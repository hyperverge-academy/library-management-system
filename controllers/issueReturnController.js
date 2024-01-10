const issueReturnService = require('../services/issueReturnService');

const issueBook = async (req, res) => {
    const { memberId, bookId } = req.body;
    const result = await issueReturnService.issueBookToMember(memberId, bookId);
    res.send(result);
};

module.exports = { issueBook };