const memberModel = require('../models/memberModule');
const resconst = require('../constants/db.constants');

const getServiceMember = async (memberId) => {
    const registered = await memberModel.getAllMembers(memberId);
    return registered;
};

module.exports = { getServiceMember};
