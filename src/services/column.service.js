const columnModel = require("../models/column.model");
const projectModel = require("../models/project.model");
const { BadRequestError } = require("../core/error.response");
const { convertToObjectIdMongose } = require("../utils/index");
class ColumnService {
  CreateColumn = async (payload, idProject) => {
    const holderProject = await projectModel.findOne({ _id: idProject });
    if (!holderProject) throw new BadRequestError("Cant create column");

    const res = await columnModel.create(payload);
    if (!res) throw new BadRequestError("Cant create column");

    const res2 = await projectModel.findByIdAndUpdate(
      { _id: idProject },
      {
        $push: { columnIds: res._id },
      },
      { new: true }
    );
    if (!res2) throw new BadRequestError("Cant create column2");
    return res;
  };

  GetAllColumns = async (projectId) => {
    const data = await projectModel
      .findById(convertToObjectIdMongose(projectId))
      .populate({
        path: "columnIds",
        populate: {
          path: "taskIds",
          model: "Task",
          populate: {
            path: 'subTaskIds', 
            model: "SubTask"
          }
        },
      })
      .exec();

    if (!data) throw new BadRequestError("Error: Cant get all columns");
    return data;
  };

  UpdateColumn = async (payload, idColumn) => {
    const holderColumn = await columnModel.findOne({ _id: idColumn });
    if (!holderColumn) throw new BadRequestError("error: Cant update column");

    const data = await columnModel.findOneAndUpdate(
      { _id: idColumn },
      payload,
      { new: true }
    );
    if (!data) throw new BadRequestError("Error: Cant update column");
    return data;
  };

  GetColumn = async (idColumn) => {
    const holderColumn = await columnModel.findOne({ _id: idColumn });
    if (!holderColumn) return "Cant find column";
    return holderColumn;
  };

  DeleteColumn = async (idColumn) => {
    const holderProject = await projectModel.findOneAndUpdate(
      { columnIds: idColumn },
      { $pull: { columnIds: idColumn } },
      { new: true }
    );

    if (!holderProject)
      throw new BadRequestError("Lỗi: Không thể xóa cột khỏi dự án");

    const holderColumn = await columnModel.findOneAndDelete({ _id: idColumn });
    if (!holderColumn) throw new BadRequestError("Lỗi: Không thể xóa cột");

    return 1;
  };
}

module.exports = new ColumnService();
