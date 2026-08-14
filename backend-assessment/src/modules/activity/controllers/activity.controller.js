const activityService = require('../services/activity.service');
const { validateCreateActivity } = require('../utils/activityValidator');

async function listActivity(req, res) {
  const activity = await activityService.getAllActivity();
  res.status(200).json({ data: activity });
}

async function addActivity(req, res) {
  const payload = validateCreateActivity(req.body);
  const activity = await activityService.createNewActivity(payload);
  res.status(201).json({ data: activity });
}

module.exports = { listActivity, addActivity };