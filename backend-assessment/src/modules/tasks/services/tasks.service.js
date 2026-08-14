const path = require("node:path");
const { readJsonArray, updateJsonArray } = require('../../../utils/jsonStore');
const { createId } = require("../../../utils/id");
const HttpError = require("../../../utils/httpError");

const TASKS_FILE_PATH = path.join(process.cwd(), "data", "tasks.json");

function buildTaskRecord(payload) {
  const now = new Date().toISOString();

  return {
    id: createId(),
    title: payload.title,
    completed: payload.completed,
    createdAt: now,
    updatedAt: now,
  };
}

async function getAllTasks() {
  return readJsonArray(TASKS_FILE_PATH);
}

async function getTaskById(taskId) {
  const tasks = await readJsonArray(TASKS_FILE_PATH);
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    throw new HttpError(404, "Task not found.");
  }

  return task;
}

async function createTask(payload) {
  // ...validation...
  return updateJsonArray(TASKS_FILE_PATH, async (tasks) => {
    const newTask = buildTaskRecord(payload);
    tasks.push(newTask);
    return { result: newTask, next: tasks };
  });
}

async function updateTask(taskId, updates) {
  // ...validation...
  return updateJsonArray(TASKS_FILE_PATH, async (tasks) => {
    const taskIndex = tasks.findIndex((item) => item.id === taskId);
    if (taskIndex === -1) {
      throw new HttpError(404, 'Task not found.');
    }
    const existingTask = tasks[taskIndex];
    const updatedTask = { ...existingTask, ...updates, updatedAt: new Date().toISOString() };
    tasks[taskIndex] = updatedTask;
    return { result: updatedTask, next: tasks };
  });
}

async function deleteTask(taskId) {
  return updateJsonArray(TASKS_FILE_PATH, async (tasks) => {
    const taskIndex = tasks.findIndex((item) => item.id === taskId);
    if (taskIndex === -1) {
      throw new HttpError(404, 'Task not found.');
    }
    const [removedTask] = tasks.splice(taskIndex, 1);
    return { result: removedTask, next: tasks };
  });
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
