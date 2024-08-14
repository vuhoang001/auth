const { model, Schema, Types } = require("mongoose");

const DOCUMENT_NAME = "Column";
const COLLECTION_NAME = "Columns";

const ColumnSchema = new Schema(
  {
    titleColumn: { type: String, default: "" },
    taskIds: {
      type: [Types.ObjectId],
      default: [],
      ref: 'Task'
    }
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = model(DOCUMENT_NAME, ColumnSchema);
