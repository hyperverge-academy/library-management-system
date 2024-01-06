const memberService = require('../services/memberService');

const getAllMembers = async (req, res) => {
    const memberId = req.params.id;
    const members = await memberService.getServiceMember(memberId);
    res.send(members);
};

const addRegisterMember = async  (req, res) => {
    const userData = req.body;
    console.log(userData);
    const output = await memberService.addMemberToDatabase(userData);

    res.send(output);

    console.log('Received userData:', userData);
};

const loginMember = async  (req, res) => {
    const userData = req.body;
    console.log(userData);

    res.send(await memberService.loginMemberToDatabase(userData));
};

module.exports = { getAllMembers,addRegisterMember,loginMember};