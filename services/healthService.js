const model = require('../models/healthModel')

const getService = function(){
    return model.healthModelResponse();
}

module.exports = {getService};