const express = require('express');

const c = require('../controllers/activity.controller');

const activityRouter = express.Router();

activityRouter.get('/', c.get_activity);
activityRouter.post('/', c.addActivity);

module.exports = activityRouter;
