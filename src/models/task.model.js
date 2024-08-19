const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Task";
const COLLECTION_NAME = "Tasks";

const taskSchema = new Schema(
  {
    taskName: String,
    taskDescription: String,
    taskStatus: {
      type: String,
      enum: ["Công việc cần làm", "Đang tiến hành", "Kiểm tra", "Hoàn thành"],
      default: "Công việc cần làm",
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
    fromDate: {
      type: Date,
      default: Date.now,
    },
    toDate: {
      type: Date,
      default: function () {
        const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
        return new Date(this.fromDate.getTime() + sevenDaysInMilliseconds);
      },
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

taskSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = model(DOCUMENT_NAME, taskSchema);
