const projectModel = require("../models/project.model");
const columnModel = require("../models/column.model");
const { BadRequestError, NotFoundError } = require("../core/error.response");
const { convertToObjectIdMongose } = require("../utils/index");

const { getAllProducts } = require("../models/repo/project.repo");
class ProjectService {
  GetProjects = async (page, size) => {
    const projects = await getAllProducts(page, size);
    if (!projects) throw new BadRequestError("Error: Cant find prjects");
    return projects;
  };

  CreateProject = async (payload, id) => {
    payload.owner = id;
    const createProject = await projectModel.create(payload);
    if (!createProject) throw new BadRequestError("Error: Cant create project");
    return createProject;
  };

  UpdateProject = async (payload, projectId) => {
    const holderProject = await projectModel.findOne({
      _id: convertToObjectIdMongose(projectId),
    });

    if (!holderProject)
      throw new NotFoundError("Not found");

    const updateProject = await projectModel.findByIdAndUpdate(
      convertToObjectIdMongose(projectId),
      payload,
      { new: true }
    );
  
    if (!updateProject)
      throw new BadRequestError("Error: Something went wrong cant updateProject");

    return updateProject;
  };

  DeleteProject = async (projectId) => {
    const holderProject = await projectModel.findOne({ _id: projectId });
    if (!holderProject)
      throw new NotFoundError(
        "Not found project"
      );

    const ObjectColumnIds = holderProject.columnIds;

    await columnModel.deleteMany({
      _id: { $in: ObjectColumnIds },
    });

    await projectModel.findOneAndDelete({
      _id: projectId,
    });

    return 1;
  };

  GetProjectById = async (projectId) => {
    const data = await projectModel.findOne({ _id: projectId });
    if (!data)
      throw new NotFoundError("Error: Something went wrong! Can get project");
    return data;
  };

  GetProjectByOwner = async (ownerId) => {
    const data = await projectModel.find({ owner: ownerId });
    if (!data)
      throw new BadRequestError("Error: Something went wrong! Can get project");
    return data;
  };
}

module.exports = new ProjectService();
