const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "ForgetPassword";
const COLLECTION_NAME = "ForgetPasswords";

const ForgetPasswordSchema = new Schema(
  {
    email: String,
    token: String,
    expireAt: {
      type: Date,
      expires: 60,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, ForgetPasswordSchema);
