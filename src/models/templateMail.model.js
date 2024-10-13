const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Template";
const COLLECTION_NAME = "Templates";

const TemplateSchema = new Schema(
  {
    objectCode: {type: String},
    objectName: {
      type: String,
    },
    template: {
      type: String,
    },
  },
  { timestamps: true, collection: COLLECTION_NAME }
);

module.exports = model(DOCUMENT_NAME, TemplateSchema);
