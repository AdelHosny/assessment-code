const express = require('express');

const asyncHandler = require('../../../middleware/asyncHandler');
const tasksController = require('../controllers/tasks.controller');

const tasksRouter = express.Router();

tasksRouter.get('/', asyncHandler(tasksController.listTasks));
tasksRouter.get('/:id', asyncHandler(tasksController.getTask));
tasksRouter.post('/', asyncHandler(tasksController.createTask));
tasksRouter.patch('/:id', asyncHandler(tasksController.patchTask));
tasksRouter.delete('/:id', asyncHandler(tasksController.removeTask));

module.exports = tasksRouter;
