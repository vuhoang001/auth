const { SuccessResponse } = require("../core/success.response");
const AccessService = require("../services/access.service");
class AccessController {
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
    console.log("req.user", req.user);
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
    console.log(token, email, password);
    new SuccessResponse({
      message: "Reset password success",
      metadata: await AccessService.resetPassword(password, token, email),
    }).send(res);
  };
}

module.exports = new AccessController();
