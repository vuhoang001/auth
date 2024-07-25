const KeyTokenModel = require("../models/keysToken.model");
const { BadRequestError } = require("../core/error.response");

class KeyTokenService {
  createKeys = async ({ user, refreshToken }) => {
    const keys = await KeyTokenModel.findOneAndUpdate(
      { user: user._id },
      {
        refreshToken: refreshToken,
      },
      { new: true, upsert: true }
    );

    if (!keys) throw new BadRequestError("Error: Can not create key token");
    return keys;
  };

  findKeyTokenByUserId = async (id) => {
    return await KeyTokenModel.findOne({ user: id });
  };

  findKeyTokenByRefreshToken = async (refreshToken) => {
    return await KeyTokenModel.findOne({ refreshToken: refreshToken });
  };

  removeKeyTokenByUserId = async (id) => {
    return await KeyTokenModel.deleteOne({
      user: id,
    });
  };
}

module.exports = new KeyTokenService();
