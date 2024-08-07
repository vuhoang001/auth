const projectModel = require("../project.model");

const getAllProducts = async (page, size) => {
  const skip = (page - 1) * size;
  const data = await projectModel.find().skip(skip).limit(size);
  const totalItems = await projectModel.countDocuments()
  const total = Math.ceil(totalItems / page)
  return { data, total };
};

module.exports = { getAllProducts };
