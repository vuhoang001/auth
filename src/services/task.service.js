const taskModel = require('../models/task.model')
const { BadRequestError } = require('../core/error.response')
const getAllTasks = require("../models/repo/task.repo")
class TaskService {
  GetTasks = async (page, size) => {
    const tasks = await getAllTasks(page, size);
    if (!tasks) throw new BadRequestError("Error: Cant find task");
    return tasks;
  }
  CreateTask = async (payload) => {
    const res = await taskModel.create(payload)
    if (!res) throw new BadRequestError("error: cant create task")
    return res;
  }
}

module.exports = new TaskService()