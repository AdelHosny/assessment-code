const express = require('express');

const asyncHandler = require('../../../middleware/asyncHandler');
const reportsController = require('../controllers/reports.controller');

const reportsRouter = express.Router();

reportsRouter.get('/tasks-summary', asyncHandler(reportsController.getTasksSummary));

module.exports = reportsRouter;