const healthService = require('../services/healthService')

const getController = function (req,res){
    console.log(healthService.getService())
    res.send(healthService.getService())
}
module.exports = {getController}