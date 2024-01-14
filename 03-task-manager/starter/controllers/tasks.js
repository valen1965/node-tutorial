const Task = require('../models/task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks: tasks });
  // res.status(200).json({ tasks: tasks, amount:tasks.length });
  // res
  //   .status(200)
  //   .json({ status: 'success', data: { tasks, nbHits: tasks.length } });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOne({ _id: TaskID });
  if (!task) {
    return next(createCustomError(`no task with id: ${TaskID} found `, 404));
    // return res.status(404).json({ msg: `no task with id: ${TaskID} found ` });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: TaskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: TaskID });
  if (!task) {
    return next(createCustomError(`no task with id: ${TaskID} found `, 404));
    // return res.status(404).json({ msg: `no task with id: ${TaskID} found ` });
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: TaskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: TaskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`no task with id: ${TaskID} found `, 404));
    // return res.status(404).json({ msg: `no task with id: ${TaskID} found ` });
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
