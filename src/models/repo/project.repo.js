const projectModel = require("../project.model");

const getAllProducts = async (userId, page, size) => {
  const query = {
    $or: [{ owner: userId }, { members: userId }],
  };

  const data = await projectModel
    .find(query)
    .skip((page - 1) * size) // Phân trang
    .limit(size); // Giới hạn số lượng sản phẩm

  const total = await projectModel.countDocuments(query); // Tổng số sản phẩm

  return { data, total };
};

module.exports = { getAllProducts };
