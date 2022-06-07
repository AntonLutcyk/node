const { Router } = require('express');

const reportController = require('../contollers/report.controller');

const reportRouter = Router();
module.exports = reportRouter;

reportRouter.get('/', reportController.getReports);

