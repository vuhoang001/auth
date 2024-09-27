const subTaskService = require("../services/subTask.service");
const { SuccessResponse } = require("../core/success.response");

class SubTaskController {
  getAll = async (req, res, next) => {
    const idTask = req.params.idTask;
    new SuccessResponse({
      message: "Get all success",
      metadata: await subTaskService.getAll(idTask),
    }).send(res);
  };
}

module.exports = new SubTaskController();
