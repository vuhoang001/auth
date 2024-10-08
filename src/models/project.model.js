const { Schema, model, Types } = require("mongoose");

const DOCUMENT_NAME = "Project";
const COLLECTION_NAME = "Projects";

const projectSchema = new Schema(
  {
    projectName: String,
    projectDescription: String,
    progressTask: {
      type: Number,
      default: 0,
    },
    columnIds: { type: [Schema.Types.ObjectId], default: [], ref: "Column" },
    fromDate: { type: Date, default: Date.now },
    toDate: { type: Date, default: Date.now },
    members: {
      type: [Schema.Types.ObjectId],
      default: [],
    },
    owner: Schema.Types.ObjectId,
    status: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, projectSchema);
