const TaskService = require("../services/task.service");
const { SuccessResponse } = require("../core/success.response");
class TaskController {
  CreateTask = async (req, res, next) => {
    const idColumn = req.params.id;
    new SuccessResponse({
      message: "Create task successfully",
      metadata: await TaskService.CreateTask(req.body, idColumn),
    }).send(res);
  };

  GetAllTasks = async (req, res, next) => {
    new SuccessResponse({
      message: "Get all",
      metadata: await TaskService.GetAll(),
    }).send(res);
  };

  GetTaskById = async (req, res, next) => {
    const idTask = req.params.id;
    new SuccessResponse({
      message: "Get task by id",
      metadata: await TaskService.GetTaskByIdTask(idTask),
    }).send(res);
  };

  UpdateTask = async (req, res, next) => {
    const taskId = req.params.id;
    new SuccessResponse({
      message: "Update task",
      metadata: await TaskService.UpdateTask(req.body, taskId),
    }).send(res);
  };

  DeleteTask = async (req, res, next) => {
    const taskId = req.params.id;
    new SuccessResponse({
      message: "Delete task message",
      metadata: await TaskService.DeleteTask(taskId),
    }).send(res);
  };
}

module.exports = new TaskController();
