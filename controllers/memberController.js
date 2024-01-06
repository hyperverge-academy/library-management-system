const memberService = require('../services/memberService');

const getAllMembers = async (req, res) => {
    const memberId = req.params.id;
    const members = await memberService.getServiceMember(memberId);
    res.send(members);
};

module.exports = { getAllMembers};