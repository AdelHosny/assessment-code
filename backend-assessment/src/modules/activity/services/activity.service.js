const path = require('node:path');

const { readJsonArray, writeJsonArray } = require('../../../utils/jsonStore');
const { createId } = require('../../../utils/id');

const ACTIVITY_FILE_PATH = path.join(__dirname, '..', '..', '..', '..', 'data', 'activity.json');

async function getAllActivity() {
  return readJsonArray(ACTIVITY_FILE_PATH);
}

async function createNewActivity(payload) {
  const activityList = await readJsonArray(ACTIVITY_FILE_PATH);

  const newActivity = {
    id: createId(),
    action: payload.action,
    info: payload.info,
    when: new Date().toISOString(),
  };

  activityList.push(newActivity);
  await writeJsonArray(ACTIVITY_FILE_PATH, activityList);

  return newActivity;
}

module.exports = { getAllActivity, createNewActivity };