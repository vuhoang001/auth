const taskModel = require("../models/task.model");
const columnModel = require("../models/column.model");
const { BadRequestError } = require("../core/error.response");
const subTaskModel = require("../models/subTask.model");
const { Types } = require("mongoose");
const projectModel = require("../models/project.model");
class TaskService {
  CreateTask = async (payload, projectId, columnId) => {
    const holderProject = await projectModel.findOne({ _id: projectId });

    if (!holderProject) throw new BadRequestError("Can not create task 1");

    const match = holderProject.columnIds.includes(columnId);
    if (!match) throw new BadRequestError("Can not create task 2");

    const createTask = await taskModel.create(payload);
    if (!createTask) throw new BadRequestError("Can not create task 3");

    const holderColumn = await columnModel.findOneAndUpdate(
      { _id: columnId },
      {
        $push: { taskIds: createTask._id },
      }
    );

    if (!holderColumn) throw new BadRequestError("Can not create task 4");
    return createTask;
  };

  GetAll = async (projectId, columnId) => {
    const holderProject = await projectModel.findOne({ _id: projectId });
    if (!holderProject) throw new BadRequestError("Can not get all1");

    const match = holderProject.columnIds.includes(columnId);
    if (!match) throw new BadRequestError("Can not get all 2");

    const data = await columnModel
      .findOne({ _id: columnId })
      .populate("taskIds");
    return data.taskIds;
  };

  GetTaskByIdTask = async (projectId, columnId, taskId) => {
    const holderProject = await projectModel.findOne({ _id: projectId });
    if (!holderProject) throw new BadRequestError("Can not get taks by id 1");

    const match = holderProject.columnIds.includes(columnId);
    if (!match) throw new BadRequestError("Can not get taks by id 2");

    const data = await columnModel
      .findOne({ _id: columnId })
      .populate("taskIds");

    const founded = data.taskIds.find((task) => task._id.toString() === taskId);
    if (!founded) throw new BadRequestError("Task not found");

    return founded;
  };

  UpdateTask = async (payload, projectId, columnId, taskId) => {
    const holderProject = await projectModel.findOne({ _id: projectId });

    if (!holderProject) throw new BadRequestError("Can not update task 1");

    const match = holderProject.columnIds.includes(columnId);
    if (!match) throw new BadRequestError("Can not update task 2");

    const data = await taskModel.findOneAndUpdate({ _id: taskId }, payload, {
      new: true,
    });

    return data;
  };

  DeleteTask = async (projectId, columnId, taskId) => {
    const holderProject = await projectModel.findOne({ _id: projectId });

    if (!holderProject) throw new BadRequestError("Can not update task 1");

    const match = holderProject.columnIds.includes(columnId);
    if (!match) throw new BadRequestError("Can not update task 2");

    const holderColumn = await columnModel.findOneAndUpdate(
      {
        taskIds: taskId,
      },
      {
        $pull: { taskIds: taskId },
      },
      { new: true }
    );

    if (!holderColumn) throw new BadRequestError("Cant delete task 3");

    const data = await taskModel.findOneAndDelete({ _id: taskId });

    if (!data) throw new BadRequestError("Cant delete task 4");
    return 1;
  };

  CreateComment = async (taskId, payload) => {
    const holderTask = await taskModel.findOne({ _id: taskId });
    return holderTask
  };

  GetAllSubTask = async (idTask) => {
    const data = await subTaskModel.find({ taskId: idTask });

    return data;
  };

  CreateSubTask = async (payload, idTask) => {
    payload.taskId = idTask;
    const create = await subTaskModel.create(payload);
    if (!create) throw new BadRequestError("Cant create sub task ");

    const updatedTask = await taskModel.findByIdAndUpdate(
      idTask,
      { $push: { subTaskIds: create._id } },
      { new: true }
    );

    if (!updatedTask) throw new NotFoundError("Task not found");

    return create;
  };

  UpdateSubTask = async (payload, idSubTask) => {
    const update = await subTaskModel.updateOne(
      { _id: idSubTask },
      {
        subTaskName: payload.subTaskName,
        statusSubTask: payload.statusSubTask,
      },
      { new: true }
    );

    if (!update) throw new BadRequestError("Sub task cant update");
    return update;
  };

  DeleteSubTask = async (idSubTask) => {
    // Xóa subtask
    const del = await subTaskModel.findOneAndDelete({ _id: idSubTask });
    if (!del)
      throw new BadRequestError("Cannot delete sub task: Subtask not found");

    // Cập nhật task
    const del2 = await taskModel.findOneAndUpdate(
      { subTaskIds: idSubTask },
      { $pull: { subTaskIds: idSubTask } },
      { new: true }
    );

    if (!del2)
      throw new BadRequestError(
        "Cannot update task: No task found containing this subtask"
      );

    return "Delete success!";
  };

  GetSubTask = async (taskId) => {
    const data = await subTaskModel.findOne({ _id: taskId });
    if (!data) throw new BadRequestError("Can find SubTask");
    return data;
  };
}

module.exports = new TaskService();
