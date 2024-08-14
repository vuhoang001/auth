const ColumnService = require("../services/column.service");
const { SuccessResponse } = require("../core/success.response");
class ColumnController {
  GetAllColumn = async (req, res, next) => {
    new SuccessResponse({
      message: "Get all column success",
      metadata: await ColumnService.GetAllColumns(),
    }).send(res);
  };

  CreateColumn = async (req, res, next) => {
    const idProject = req.params.id;
    new SuccessResponse({
      message: "Create column success !",
      metadata: await ColumnService.CreateColumn(req.body, idProject),
    }).send(res);
  };

  UpdateColumn = async (req, res, next) => {
    const idColumn = req.params.id;
    new SuccessResponse({
      message: "Update column success!",
      metadata: await ColumnService.UpdateColumn(req.body, idColumn),
    }).send(res);
  };

  DeleteColumn = async (req, res, next) => {
    const idColumn = req.params.id;
    new SuccessResponse({
      message: "Delete column success!",
      metadata: await ColumnService.DeleteColumn(idColumn),
    }).send(res);
  };

  GetColumn = async (req, res, next) => {
    const idColumn = req.params.id;
    new SuccessResponse({
      message: "Get column",
      metadata: await ColumnService.GetColumn(idColumn),
    }).send(res);
  };
}

module.exports = new ColumnController();