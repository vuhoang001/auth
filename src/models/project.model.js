const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Project";
const COLLECTION_NAME = "Projects";

const projectSchema = new Schema(
  {
    project_name: String,
    project_description: String,
    progress_task: Number,
    members: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    owner: Schema.Types.ObjectId,
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, projectSchema);
