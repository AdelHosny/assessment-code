const path = require('node:path');
const { readJsonArray, updateJsonArray } = require('../../../utils/jsonStore');
const { createId } = require('../../../utils/id');

const ACTIVITY_FILE_PATH = path.join(__dirname, '..', '..', '..', '..', 'data', 'activity.json');

async function getAllActivity() {
  return readJsonArray(ACTIVITY_FILE_PATH);
}

async function createNewActivity(payload) {
  return updateJsonArray(ACTIVITY_FILE_PATH, async (activityList) => {
    const newActivity = {
      id: createId(),
      action: payload.action,
      info: payload.info,
      when: new Date().toISOString(),
    };

    activityList.push(newActivity);
    return { result: newActivity, next: activityList };
  });
}
module.exports = { getAllActivity, createNewActivity };