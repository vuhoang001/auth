const { SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");
class AccessController {
  GetMe = async (req, res, next) => {
    new SuccessResponse({
      message: "Get information",
      metadata: await AccessService.GetMe(req.user.UserId),
    }).send(res);
  };

  ChangePassword = async (req, res, next) => {
    const user = req.user.UserId;
    const { newPassword, oldPassword } = req.body;
    new SuccessResponse({
      message: "change password success",
      metadata: await AccessService.changePassword(
        oldPassword,
        newPassword,
        user
      ),
    }).send(res);
  };

  EditGetMe = async (req, res, next) => {
    const { files } = req;
    new SuccessResponse({
      message: "Edit success",
      metadata: await AccessService.UpdateGetMe(
        req.user.UserId,
        req.body,
        files
      ),
    }).send(res);
  };

  GetAllUser = async (req, res, next) => {
    const p = req.query.p;
    new SuccessResponse({
      message: "Get all user",
      metadata: await AccessService.GetAllUser(p),
    }).send(res);
  };

  GetUserById = async (req, res, next) => {
    const UserId = req.params.UserId;
    new SuccessResponse({
      message: "Get user by Id",
      metadata: await AccessService.GetUserById(UserId),
    }).send(res);
  };

  GetUserByKeyword = async (req, res, next) => {
    const keyword = req.params.keyword;
    new SuccessResponse({
      message: "Get user by keyword",
      metadata: await AccessService.GetUserByKeyword(keyword),
    }).send(res);
  };

  socket = async (req, res, next) => {
    new SuccessResponse({
      message: "Socket test",
      metadata: await AccessService.socket(),
    }).send(res);
  };

  Upload = async (req, res, next) => {
    new SuccessResponse({
      message: "Upload",
      metadata: await AccessService.Upload(req.file),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new SuccessResponse({
      message: "Register success!",
      metadata: await AccessService.signUp(req.body),
    }).send(res);
  };

  login = async (req, res, next) => {
    new SuccessResponse({
      message: "Login success!",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  logout = async (req, res, next) => {
    const user = req.user;
    new SuccessResponse({
      message: "Logout success!",
      metadata: await AccessService.logout(user),
    }).send(res);
  };

  handleRefreshToken = async (req, res, next) => {
    const user = req.user;
    const refreshToken = req.refreshToken;
    new SuccessResponse({
      message: "Handle refresh token success!",
      metadata: await AccessService.handleRefreshToken(user, refreshToken),
    }).send(res);
  };

  handleOTP = async (req, res, next) => {
    const { email } = req.body;
    new SuccessResponse({
      message: "Get OTP success",
      metadata: await AccessService.handleOTP(email),
    }).send(res);
  };

  resetPassword = async (req, res, next) => {
    const token = req.query.token;
    const email = req.query.email;
    const { password } = req.body;
    new SuccessResponse({
      message: "Reset password success",
      metadata: await AccessService.resetPassword(password, token, email),
    }).send(res);
  };
}

module.exports = new AccessController();
