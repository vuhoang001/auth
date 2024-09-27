const ColumnService = require("../services/column.service");
const { SuccessResponse } = require("../core/success.response");
class ColumnController {
  GetAllColumn = async (req, res, next) => {
    const idProject = req.params.projectId;
    new SuccessResponse({
      message: "Get all columns by id project success",
      metadata: await ColumnService.GetAllColumns(idProject),
    }).send(res);
  };

  CreateColumn = async (req, res, next) => {
    const idProject = req.params.projectId;
    console.log(idProject);
    new SuccessResponse({
      message: "Create column success !",
      metadata: await ColumnService.CreateColumn(req.body, idProject),
    }).send(res);
  };

  UpdateColumn = async (req, res, next) => {
    const idColumn = req.params.columnId;
    new SuccessResponse({
      message: "Update column success!",
      metadata: await ColumnService.UpdateColumn(req.body, idColumn),
    }).send(res);
  };

  DeleteColumn = async (req, res, next) => {
    const idColumn = req.params.columnId;
    new SuccessResponse({
      message: "Delete column success!",
      metadata: await ColumnService.DeleteColumn(idColumn),
    }).send(res);
  };

  GetColumn = async (req, res, next) => {
    const idColumn = req.params.columnId;
    console.log(idColumn);
    new SuccessResponse({
      message: "Get column",
      metadata: await ColumnService.GetColumn(idColumn),
    }).send(res);
  };
}

module.exports = new ColumnController();
