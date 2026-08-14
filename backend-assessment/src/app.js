const express = require('express');

const tasksRouter = require('./modules/tasks/routes/tasks.routes');
const activityRouter = require('./modules/activity/routes/activity.routes');
const errorHandler = require('./middleware/errorHandler');
const HttpError = require('./utils/httpError');

const app = express();

app.use(express.json());

app.use('/tasks', tasksRouter);
app.use('/activity', activityRouter);

app.use((req, res, next) => {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`));
});

app.use(errorHandler);

module.exports = app;
