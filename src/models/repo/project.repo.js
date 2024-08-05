const projectModel = require("../project.model");

const getAllProducts = async (page, size) => {
  const skip = (page - 1) * size;
  const data = await projectModel.find().skip(skip).limit(size);
  return data;
};

module.exports = { getAllProducts };
