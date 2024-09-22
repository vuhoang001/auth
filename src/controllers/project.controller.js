const { SuccessResponse } = require("../core/success.response");
const ProjectService = require("../services/project.service");

class ProjectController {
  CreateProject = async (req, res, next) => {
    const userId = req.user.UserId;
    new SuccessResponse({
      message: "Create project success!",
      metadata: await ProjectService.CreateProject(req.body, userId),
    }).send(res);
  };

  UpdateProject = async (req, res, next) => {
    const projectId = req.params.id;
    new SuccessResponse({
      message: "Updated project success",
      metadata: await ProjectService.UpdateProject(req.body, projectId),
    }).send(res);
  };

  DeleteProject = async (req, res, next) => {
    new SuccessResponse({
      message: "Delete project success",
      metadata: await ProjectService.DeleteProject(req.params.id),
    }).send(res);
  };

  GetAllProjects = async (req, res, next) => {
    const page = req.query.page || 1;
    const size = req.query.size || 50;
    new SuccessResponse({
      message: "Get all projects",
      metadata: await ProjectService.GetProjects(page, size),
    }).send(res);
  };

  GetProject = async (req, res, next) => {
    console.log(req.params.id);
    new SuccessResponse({
      message: "Get project success",
      metadata: await ProjectService.GetProjectById(req.params.id),
    }).send(res);
  };

  GetProjectByOwner
}

module.exports = new ProjectController();
