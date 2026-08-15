const tasksService = require('../../tasks/services/tasks.service');
const activityService = require('../../activity/services/activity.service');
const { STATUS_VALUES } = require('../../tasks/utils/taskValidator');

const RECENT_ACTIVITY_LIMIT = 10;

async function getTasksSummary() {
  const [tasks, activity] = await Promise.all([
    tasksService.getAllTasks(),
    activityService.getAllActivity(),
  ]);

  const byStatus = STATUS_VALUES.reduce((counts, status) => {
    counts[status] = 0;
    return counts;
  }, {});

  for (const task of tasks) {
    if (Object.hasOwn(byStatus, task.status)) {
      byStatus[task.status] += 1;
    }
  }

  return {
    total: tasks.length,
    byStatus,
    recentActivityCount: Math.min(activity.length, RECENT_ACTIVITY_LIMIT),
  };
}

module.exports = { getTasksSummary };