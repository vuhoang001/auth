const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Task";
const COLLECTION_NAME = "Tasks";

const taskSchema = new Schema(
  {
    task_name: String,
    task_description: String,
    task_status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    assignees: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "Account",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "Account",
        },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = model(DOCUMENT_NAME, taskSchema);
