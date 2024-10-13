const TaskService = require("../services/task.service");
const { SuccessResponse } = require("../core/success.response");
const taskService = require("../services/task.service");
class TaskController {
  CreateTask = async (req, res, next) => {
    const columnId = req.params.columnId;
    const projectId = req.params.projectId;
    new SuccessResponse({
      message: "Create task successfully",
      metadata: await TaskService.CreateTask(req.body, projectId, columnId),
    }).send(res);
  };

  GetAllTasks = async (req, res, next) => {
    const projectId = req.params.projectId;
    const columnId = req.params.columnId;
    new SuccessResponse({
      message: "Get all",
      metadata: await TaskService.GetAll(projectId, columnId),
    }).send(res);
  };

  GetTaskById = async (req, res, next) => {
    const taskId = req.params.taskId;
    const projectId = req.params.projectId;
    const columnId = req.params.columnId;
    new SuccessResponse({
      message: "Get task by id",
      metadata: await TaskService.GetTaskByIdTask(projectId, columnId, taskId),
    }).send(res);
  };

  UpdateTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    const projectId = req.params.projectId;
    const columnId = req.params.columnId;
    new SuccessResponse({
      message: "Update task",
      metadata: await TaskService.UpdateTask(
        req.body,
        projectId,
        columnId,
        taskId
      ),
    }).send(res);
  };

  DeleteTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    const projectId = req.params.projectId;
    const columnId = req.params.columnId;
    new SuccessResponse({
      message: "Delete task message",
      metadata: await TaskService.DeleteTask(projectId, columnId, taskId),
    }).send(res);
  };

  GetAllSubTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    new SuccessResponse({
      message: "Get all sub task",
      metadata: await taskService.GetAllSubTask(taskId),
    }).send(res);
  };

  GetSubTask = async (req, res, next) => {
    const subTaskId = req.params.subTaskId;
    new SuccessResponse({
      message: "Get sub task",
      metadata: await taskService.GetSubTask(subTaskId),
    }).send(res);
  };

  CreateSubTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    new SuccessResponse({
      message: "Create sub task",
      metadata: await taskService.CreateSubTask(req.body, taskId),
    }).send(res);
  };

  UpdateSubTask = async (req, res, next) => {
    // const idTask = req.params.idTask;
    const subTaskId = req.params.subTaskId;
    new SuccessResponse({
      message: "Update sub task",
      metadata: await taskService.UpdateSubTask(req.body, subTaskId),
    }).send(res);
  };

  DeleteSubTask = async (req, res, next) => {
    const subTaskId = req.params.subTaskId;
    new SuccessResponse({
      message: "Delete subtask",
      metadata: await taskService.DeleteSubTask(subTaskId),
    }).send(res);
  };

  CreateComment = async (req, res, next) => {
    const taskId = req.params.taskId;
    new SuccessResponse({
      message: "Create comment",
      metadata: await taskService.CreateComment(taskId, req.body),
    }).send(res);
  };
}

module.exports = new TaskController();
