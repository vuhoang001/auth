const projectModel = require("../models/project.model");
const columnModel = require("../models/column.model");
const permissionModel = require("../models/permissions.model");
const tempModel = require('../models/templateMail.model')
const {
  BadRequestError,
  NotFoundError,
  AuthFailureError,
} = require("../core/error.response");
const { convertToObjectIdMongose } = require("../utils/index");

const { getAllProducts } = require("../models/repo/project.repo");
const { default: mongoose } = require("mongoose");
const { sendMail } = require("../configs/nodemailer.config");
const accountModel = require("../models/account.model");
class ProjectService {
  ChangeRole = async (projectId, payload) => {
    const holderPermission = await permissionModel.findOneAndUpdate(
      {
        projectId: projectId,
        userId: payload.userId,
      },
      {
        role: payload.role,
      }
    );

    if (!holderPermission) throw new AuthFailureError("Can not change role");
    return holderPermission;
  };

  AddMembersToProject = async (projectId, payload) => {
    const { memberIds } = payload;
    const members = await accountModel.find({
      _id: { $in: memberIds.map((id) => new mongoose.Types.ObjectId(id)) },
    });

    const templateModel = await tempModel.findOne({objectCode: "AM"}) 
    console.log(templateModel)
    
    for (var i = 0; i < members.length; i++) {
      sendMail(members[i].email, link);
    }
    const holderProject = await projectModel.findOne({ _id: projectId });
    if (!holderProject) throw new BadRequestError("Something went wrong");

    return "Add member success";
  };
  GetProjects = async (userId, page, size) => {
    const projects = await getAllProducts(userId, page, size);
    if (!projects) throw new BadRequestError("Error: Cant find prjects");
    return projects;
  };

  CreateProject = async (payload, id) => {
    payload.owner = id;
    const createProject = await projectModel.create(payload);
    if (!createProject) throw new BadRequestError("Error: Cant create project");

    const holderPermission = await permissionModel.create({
      projectId: createProject._id,
      userId: id,
      role: "editor",
    });

    if (!holderPermission)
      throw new "Something went wrong when create project"();
    return createProject;
  };

  UpdateProject = async (payload, projectId) => {
    const holderProject = await projectModel.findOne({
      _id: convertToObjectIdMongose(projectId),
    });

    if (!holderProject) throw new NotFoundError("Not found");

    const updateProject = await projectModel.findByIdAndUpdate(
      convertToObjectIdMongose(projectId),
      payload,
      { new: true }
    );

    if (!updateProject)
      throw new BadRequestError(
        "Error: Something went wrong cant updateProject"
      );

    return updateProject;
  };

  DeleteProject = async (projectId) => {
    const holderProject = await projectModel.findOne({ _id: projectId });
    if (!holderProject) throw new NotFoundError("Not found project");

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
