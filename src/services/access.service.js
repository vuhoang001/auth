const AccountModel = require("../models/account.model");
const ForgetPasswordModel = require("../models/forgetPassword.model");
const projectModel = require("../models/project.model");

const { BadRequestError, AuthFailureError } = require("../core/error.response");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { createTokensPair } = require("../auth/authUtils");
const { getInfoData, convertToObjectIdMongose } = require("../utils/index");
const KeyTokenService = require("../services/keyToken.service");
const { getAccountByEmail } = require("../models/repo/account.repo");
const { sendMail } = require("../configs/nodemailer.config");
const { uploadImageFromLocalFiles } = require("../helpers/cloudinary");

const { getIo } = require("../configs/socket.config");

class AccessService {
  GetMe = async (idCilent) => {
    const holderAccount = await AccountModel.findOne({ _id: idCilent }).select(
      "-password -status"
    );
    if (!holderAccount) throw new BadRequestError("Cant found informatin");
    return holderAccount;
  };

  GetUserByKeyword = async (keyword) => {
    keyword = new RegExp(keyword, "i");
    const holderAccount = await AccountModel.find({
      $or: [{ name: keyword }, { email: keyword }],
    }).select("-password -status");

    if (holderAccount.length == 0)
      throw new BadRequestError("Record not found");

    return holderAccount;
  };

  GetUserByKeyword = async (keyword) => {
    keyword = new RegExp(keyword, "i");
    const holderAccount = await AccountModel.find({
      $or: [{ name: keyword }, { email: keyword }],
    }).select("-password -status");

    if (holderAccount.length == 0)
      throw new BadRequestError("Record not found");

    return holderAccount;
  };

  UpdateGetMe = async (idClient, payload, files) => {
    const holderAccount = await AccountModel.findOne({ _id: idClient });
    if (!holderAccount) throw new BadRequestError("Cont found information ");

    const image = await uploadImageFromLocalFiles(files);
    if (image) {
      console.log(image[0].thumb_url);
      payload.thumbnail = image[0].thumb_url;
    }
    Object.assign(holderAccount, payload);
    const data = await holderAccount.save();
    if (!data) throw new BadRequestError("Can not edit get me");
    return "Success";
  };

  GetAllUser = async (p) => {
    let holderAccount;
    if (!p) {
      holderAccount = await AccountModel.find().select("name email _id");
    } else {
      holderAccount = await projectModel
        .findOne({
          _id: convertToObjectIdMongose(p),
        })
        .populate({
          path: "members",
          select: "-password ",
        })
        .populate({
          path: "owner",
          select: "-password",
        })
        .select("members owner");
    }

    if (!holderAccount) throw new BadRequestError("Not found data");
    return holderAccount;
  };

  GetUserById = async (UserId) => {
    const holderAccount = await AccountModel.findOne({ _id: UserId }).select(
      "name thumbnail email _id"
    );
    if (!holderAccount) throw new BadRequestError("Not found data");
    return holderAccount;
  };

  socket = async () => {
    const io = getIo(); // Lấy đối tượng io
    const message = "hello client";
    io.emit("message", message); // Gửi tin nhắn qua socket
    return "Message sent via socket";
  };

  Upload = async (file) => {
    return file;
  };

  signUp = async ({ username, email, password }) => {
    const holderAccount = await AccountModel.findOne({ email });
    if (holderAccount) throw new BadRequestError("Error: Account is registed");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = await AccountModel.create({
      name: username,
      name: username,
      password: hashedPassword,
      email,
    });

    if (!newAccount)
      throw new BadRequestError(
        "Error: Something went wrong! Cant create account"
      );
    return {
      user: getInfoData({
        fields: ["_id", "name", "email"],
        object: newAccount,
      }),
    };
  };

  login = async ({ username, password }) => {
    const foundAccount = await AccountModel.findOne({ email: username });

    if (!foundAccount)
      throw new AuthFailureError("Error: Account is not registed!");

    const match = await bcrypt.compare(password, foundAccount.password);
    if (!match)
      throw new AuthFailureError("Error: Email or password is wrong!");

    const tokens = await createTokensPair({
      UserId: foundAccount._id,
      email: foundAccount.email,
    });

    if (!tokens) throw new BadRequestError("Error: Can not create tokens");

    const keyStore = await KeyTokenService.createKeys({
      user: foundAccount,
      refreshToken: tokens.refreshToken,
    });

    if (!keyStore)
      throw new BadRequestError("Error: can not create or update KeyStore");
    return {
      user: getInfoData({
        fields: ["_id", "name", "email", "thumbnail"],
        object: foundAccount,
      }),
      accessToken: tokens.accessToken,
      atokenExp: tokens.atokenExp,
      refreshToken: tokens.refreshToken,
      rtokenExp: tokens.rtokenExp,
    };
  };

  logout = async (user) => {
    const userId = user.UserId;
    const res = await KeyTokenService.removeKeyTokenByUserId(userId);
    return res;
  };

  handleRefreshToken = async (user, refreshToken) => {
    const userId = user.UserId;
    const email = user.email;
    const keyStore = await KeyTokenService.findKeyTokenByRefreshToken(
      refreshToken
    );
    if (!keyStore) throw new BadRequestError("Unauthorcation");

    if (keyStore.refreshTokenUsed.includes(refreshToken)) {
      await KeyTokenService.removeKeyTokenByUserId(userId);
      throw new AuthFailureError("Error: Something went wrong! Please relogin");
    }

    const foundUser = await getAccountByEmail(email);
    if (!foundUser) throw new BadRequestError("Error: Cant found account");

    const tokens = await createTokensPair({
      UserId: foundUser._id,
      email,
    });

    if (!tokens) throw new BadRequestError("Error: Cant create tokens");

    const holderTokens = await KeyTokenService.findKeyTokenByUserId(
      foundUser._id
    );
    if (!holderTokens)
      throw new BadRequestError("Error: Cant not found Tokens");

    const res = await holderTokens.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });

    if (!res) throw new BadRequestError("Error: Cant set or update res");
    return {
      user: {
        userId,
        email,
      },
      accessToken: tokens.accessToken,
      atokenExp: tokens.atokenExp,
      refreshToken: tokens.refreshToken,
      rtokenExp: tokens.rtokenExp,
    };
  };

  handleOTP = async (email) => {
    const holderUser = await getAccountByEmail(email);
    if (!holderUser) throw new AuthFailureError("Error: Invalid email");

    const resetToken = crypto.randomBytes(64).toString("hex");

    const hash = await bcrypt.hash(resetToken, 10);

    const forgetPassword = await ForgetPasswordModel.create({
      email: email,
      token: hash,
      expireAt: Date.now(),
    });

    if (!forgetPassword) throw new BadRequestError("Error: Cant create OTP");
    const link = `${process.env.URL_PORT}/passwordReset?token=${resetToken}&email=${email}`;
    const subject = "This is your otp"
    sendMail(email, link, subject);
    return link;
  };

  changePassword = async (oldPassword, newPassword, userId) => {
    if (!oldPassword || !newPassword)
      throw new BadRequestError("can not get new password or old password");
    const holderUser = await AccountModel.findOne({ _id: userId });
    if (!holderUser) throw new BadRequestError("can not get holder user");

    let match = bcrypt.compare(holderUser.password, oldPassword);

    if (!match) {
      throw new BadRequestError("Password is wrong");
    }

    newPassword = await bcrypt.hash(newPassword, 10);
    await holderUser.updateOne({ password: newPassword });
    return 1;
  };

  resetPassword = async (password, resetToken, email) => {
    const passwordResetToken = await ForgetPasswordModel.findOne({ email });
    console.log("resetToeknn", passwordResetToken);
    if (!passwordResetToken)
      throw new Error("Error: Invalid or expired password reset token");

    const isValid = await bcrypt.compare(resetToken, passwordResetToken.token);

    if (!isValid)
      throw new Error("Error: Invalid or expired password reset token2");

    const hashedPassword = await bcrypt.hash(password, 10);

    const holderAccount = await AccountModel.updateOne(
      { email },
      {
        $set: { password: hashedPassword },
      },
      { new: true }
    );

    return {
      holderAccount,
    };
  };


  ForgetPassword = async (email) => {
    const holderUser = await AccountModel.findOne({ email: email });
    if (holderUser == null) {
      throw new BadRequestError("Cant find user")
    }

      sendMail(email, )

  }
}
module.exports = new AccessService();
