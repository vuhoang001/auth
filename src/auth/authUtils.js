const jwt = require("jsonwebtoken");

const { AuthFailureError, BadRequestError } = require("../core/error.response");
const AsyncHandle = require("../helpers/AsyncHandle");
const { getAccountById } = require("../models/repo/account.repo");
const projectModel = require("../models/project.model");
const permissionModel = require("../models/permissions.model");
const { Types } = require("mongoose");
const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};

const createTokensPair = async (payload) => {
  try {
    accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "2 days",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7 days",
    });
    const rtokenTime = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const atokenTime = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return {
      accessToken,
      refreshToken,
      rtokenExp: rtokenTime.exp,
      atokenExp: atokenTime.exp,
    };
  } catch (error) {
    return error;
  }
};

const authentication = AsyncHandle(async (req, res, next) => {
  const Bearer = req.headers[HEADER.AUTHORIZATION];
  const refreshToken = req.headers[HEADER.REFRESHTOKEN];
  let accessToken;
  if (Bearer) accessToken = Bearer.split(" ")[1];

  if (!refreshToken && !accessToken)
    throw new AuthFailureError("Invalid token");
  if (refreshToken) {
    const decodedUser = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const holderAccount = await getAccountById(decodedUser.UserId);
    if (!holderAccount) throw new AuthFailureError("Invalid refresh token!");
    req.user = decodedUser;
    req.refreshToken = refreshToken;
  }

  if (accessToken) {
    const decodedUser = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const holderAccount = await getAccountById(decodedUser.UserId);
    if (!holderAccount) throw new AuthFailureError("Invalid access token!");
    req.user = decodedUser;
  }
  next();
});

const checkStatusProject = AsyncHandle(async (req, res, next) => {
  const projectId = req.params.projectId;
  const userId = req.user;
  if (!projectId) throw new BadRequestError("Something went wrong!");

  const holderProject = await projectModel.findById(projectId);

  if (!holderProject) throw new BadRequestError("Not found any project");

  if (holderProject.status == "public") {
    next();
  }

  const conditionOwner = holderProject.owner.toString() == userId.UserId;
  const conditionMembers = holderProject.members.includes(userId);

  if (!conditionOwner && !conditionMembers) {
    throw new AuthFailureError("Unauthorized");
  }
  next();
});

const checkPermission = AsyncHandle(async (req, res, next) => {
  const user = req.user;

  const pms = await permissionModel.findOne({
    userId: user.UserId,
  });

  if (pms.role != "editor") {
    throw new AuthFailureError("Unaithorized 2");
  }
  next();
});

module.exports = {
  createTokensPair,
  authentication,
  checkStatusProject,
  checkPermission,
};
