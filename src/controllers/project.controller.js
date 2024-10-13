const { SuccessResponse } = require("../core/success.response");
const ProjectService = require("../services/project.service");

class ProjectController {
  Permission = async (req, res, next) => {
    const projectId = req.params.projectId;
    new SuccessResponse({
      message: "Change role success!",
      metadata: await ProjectService.ChangeRole(projectId, req.body),
    }).send(res);
  };

  AddMemberToProject = async (req, res, next) => {
    const projectId = req.params.projectId;
    new SuccessResponse({
      message: "Add members to project",
      metadata: await ProjectService.AddMembersToProject(projectId, req.body),
    }).send(res);
  };
  CreateProject = async (req, res, next) => {
    const userId = req.user.UserId;
    new SuccessResponse({
      message: "Create project success!",
      metadata: await ProjectService.CreateProject(req.body, userId),
    }).send(res);
  };

  UpdateProject = async (req, res, next) => {
    const projectId = req.params.projectId;
    new SuccessResponse({
      message: "Updated project success",
      metadata: await ProjectService.UpdateProject(req.body, projectId),
    }).send(res);
  };

  DeleteProject = async (req, res, next) => {
    new SuccessResponse({
      message: "Delete project success",
      metadata: await ProjectService.DeleteProject(req.params.projectId),
    }).send(res);
  };

  GetAllProjects = async (req, res, next) => {
    const userId = req.user.UserId;
    const page = req.query.page || 1;
    const size = req.query.size || 50;
    new SuccessResponse({
      message: "Get all projects",
      metadata: await ProjectService.GetProjects(userId, page, size),
    }).send(res);
  };

  GetProject = async (req, res, next) => {
    const projectId = req.params.projectId;
    new SuccessResponse({
      message: "Get project success",
      metadata: await ProjectService.GetProjectById(projectId),
    }).send(res);
  };
}

module.exports = new ProjectController();
