const TaskService = require('../services/task.service')
const { SuccessResponse } = require('../core/success.response')
class TaskController {
  CreateTask = async (req, res, next) => {
    new SuccessResponse(
      {
        message: "Create task successfully",
        metadata: await TaskService.CreateTask(req.body)
      }
    ).send(res)
  }
  GetAllTasks = async (req, res, next) => {
    const page = req.query.page || 1;
    const size = req.query.size || 50;
    new SuccessResponse({
      message: "Get all projects",
      metadata: await TaskService.GetTasks(page, size),
    }).send(res);
  }
}

module.exports = new TaskController()