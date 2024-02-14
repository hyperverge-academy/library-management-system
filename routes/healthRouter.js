const express = require('express');
const healthControllers = require('../controllers/healthController')

const healthRouter = express.Router();

healthRouter.get('/healthRoute',healthControllers.getController)

module.exports = healthRouter