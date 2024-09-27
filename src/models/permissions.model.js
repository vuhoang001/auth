const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Permission";
const COLLECTION_NAME = "Permissions";

const PermissionSchema = new Schema(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Account",
    },
    role: {
      type: String,
      enum: ["viewer", "editor"],
      default: "viewer",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, PermissionSchema);
