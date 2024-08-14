const taskModel = require("../models/task.model");
const columnModel = require("../models/column.model");
const { BadRequestError } = require("../core/error.response");

class TaskService {
  CreateTask = async (payload, idColumn) => {
    const holderColumn = await columnModel.findOne({ _id: idColumn });
    if (!holderColumn) throw new BadRequestError("Error: Cant create task");

    const res = await taskModel.create(payload);
    if (!res) throw new BadRequestError("error: cant create task");

    const data = await columnModel.findOneAndUpdate(
      { _id: idColumn },
      {
        $push: { taskIds: res._id },
      },
      { new: true }
    );

    if (!data) throw new BadRequestError("error: cant create task 2");

    return res;
  };

  GetAll = async () => {
    const data = await taskModel.find();
    return data;
  };

  GetTaskByIdTask = async (idTask) => {
    const data = await taskModel.findOne({ _id: idTask });
    return data;
  };

  UpdateTask = async (payload, taskId) => {
    const holderTask = await taskModel.findOne({ _id: taskId });
    if (!holderTask) throw new BadRequestError("error: cant update task");

    const data = await taskModel.findOneAndUpdate({ _id: taskId }, payload, {
      new: true,
    });

    return data;
  };

  DeleteTask = async (taskId) => {
    const holderColumn = await columnModel.findOneAndUpdate(
      {
        taskIds: taskId,
      },
      {
        $pull: { taskIds: taskId },
      },
      { new: true }
    );

    if (!holderColumn) throw new BadRequestError("Cant delete task");

    const data = await taskModel.findOneAndDelete({ _id: taskId });

    if (!data) throw new BadRequestError("Cant delete task 2");
    return 1;
  };
}

module.exports = new TaskService();
