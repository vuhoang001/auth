const taskModel = require("../task.model")

const getAllTasks = async (page, size) => {
  const skip = (page - 1) * size
  const data = await taskModel.find().skip(skip).limit(size)
  const totalItems = await taskModel.countDocuments()
  const total = Math.ceil(totalItems / size)
  return { data, total }
}
module.exports = { getAllTasks }