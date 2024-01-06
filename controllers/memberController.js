const memberService = require('../services/memberService');

const getAllMembers = async (req, res) => {
    const memberId = req.params.id;
    const members = await memberService.getServiceMember(memberId);
    res.send(members);
};

const addMember = async  (req, res) => {
    const userData = req.body;
    console.log(userData);
    const output = await memberService.addMemberToDatabase(userData);

    res.send(output);

    console.log('Received userData:', userData);
};
module.exports = { getAllMembers,addMember};