const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "SubTask";
const COLLECTION_NAME = "SubTasks";

const SubTaskSchema = new Schema(
  {
    subTaskName: String,
    statusSubTask: Boolean,
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, SubTaskSchema);
