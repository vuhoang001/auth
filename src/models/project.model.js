const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Project";
const COLLECTION_NAME = "Projects";

const projectSchema = new Schema(
  {
    projectName: String,
    projectDescription: String,
    progressTask: Number,
    columnIds: { type: [Schema.Types.ObjectId], default: [], ref: 'Column' },
    fromDate: { type: Date, default: Date() },
    toDate: { type: Date, default: Date() },
    members: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    owner: Schema.Types.ObjectId,
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, projectSchema);
