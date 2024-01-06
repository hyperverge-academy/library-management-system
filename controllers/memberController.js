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

const deleteMember = async (req, res) => {
    const memberId = req.params.id;
    const result = await memberService.deleteMemberFromDatabase(memberId);
    res.send(result);
};

const editMemberDetails = async (req, res) => {
    const memberId = req.params.id;
    const updatedData = req.body;
    const result = await memberService.editMemberDetailsInDatabase(memberId, updatedData);
    res.send(result);
};
module.exports = { getAllMembers,addRegisterMember,loginMember,deleteMember,editMemberDetails};
