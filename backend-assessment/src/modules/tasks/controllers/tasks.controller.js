const tasksService = require('../services/tasks.service');

async function listTasks(req, res) {
  const tasks = await tasksService.getAllTasks();
  res.status(200).json({ data: tasks });
}

async function getTask(req, res) {
  const task = await tasksService.getTaskById(req.params.id);
  res.status(200).json({ data: task });
}

async function createTask(req, res) {
  const payload = req.body || {};

  if (typeof payload !== 'object' || Array.isArray(payload)) {
    return res.status(400).json({ error: { message: 'Body must be an object.' } });
  }

  if (typeof payload.title !== 'string') {
    return res
      .status(400)
      .json({ error: { message: 'title is required and must be string' } });
  }

  payload.title = payload.title.trim();
  if (!payload.title) {
    return res.status(400).json({ error: { message: 'title cannot be empty' } });
  }

  if (payload.completed === undefined) {
    payload.completed = false;
  }

  if (typeof payload.completed !== 'boolean') {
    return res.status(400).json({ error: { message: 'completed must be boolean' } });
  }

  const task = await tasksService.createTask(payload);

  res.status(201).json({ data: task });
}

async function patchTask(req, res) {
  const updates = req.body || {};

  if (typeof updates !== 'object' || Array.isArray(updates)) {
    return res.status(400).json({ error: { message: 'bad body type' } });
  }

  if (updates.title !== undefined && typeof updates.title !== 'string') {
    return res.status(400).json({ error: { message: 'title should be string' } });
  }

  if (typeof updates.title === 'string') {
    updates.title = updates.title.trim();
  }

  if (
    updates.title === undefined &&
    updates.completed === undefined
  ) {
    return res.status(400).json({ error: { message: 'nothing to update' } });
  }

  if (updates.completed !== undefined && typeof updates.completed !== 'boolean') {
    return res.status(400).json({ error: { message: 'completed should be bool' } });
  }

  const task = await tasksService.updateTask(req.params.id, updates);

  res.status(200).json({ data: task });
}

async function removeTask(req, res) {
  await tasksService.deleteTask(req.params.id);
  res.status(204).send();
}

module.exports = {
  listTasks,
  getTask,
  createTask,
  patchTask,
  removeTask,
};
