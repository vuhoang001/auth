const express = require("express");
const router = express.Router();
const AsynHandle = require("../helpers/AsyncHandle");
const ProjectController = require("../controllers/project.controller");
const columnController = require("../controllers/column.controller");
const taskController = require("../controllers/task.controller");

const {
  authentication,
  checkStatusProject,
  checkPermission,
} = require("../auth/authUtils");
const AsyncHandle = require("../helpers/AsyncHandle");

router.use(authentication);

router.post("/", AsyncHandle(ProjectController.CreateProject));
router.get("/", AsynHandle(ProjectController.GetAllProjects));

router.patch(
  "/:projectId",
  checkStatusProject,
  checkPermission,
  AsynHandle(ProjectController.UpdateProject)
);

router.delete(
  "/:projectId",
  checkStatusProject,
  checkPermission,
  AsynHandle(ProjectController.DeleteProject)
);

router.get(
  "/:projectId",
  checkStatusProject,
  checkPermission,
  AsyncHandle(ProjectController.GetProject)
);

//COLUMNS

router.get(
  "/:projectId/columns",
  checkStatusProject,
  checkPermission,
  AsyncHandle(columnController.GetAllColumn)
);

router.get(
  "/:projectId/columns/:columnId",
  checkStatusProject,
  checkPermission,
  AsyncHandle(columnController.GetColumn)
);

router.post(
  "/:projectId/columns",
  checkStatusProject,
  checkPermission,
  AsyncHandle(columnController.CreateColumn)
);

router.patch(
  "/:projectId/columns/:columnId",
  checkStatusProject,
  checkPermission,
  AsyncHandle(columnController.UpdateColumn)
);

router.delete(
  "/:projectId/columns/:columnId",
  checkStatusProject,
  checkPermission,
  AsyncHandle(columnController.DeleteColumn)
);

// TASK

router.get(
  "/:projectId/columns/:columnId/task",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.GetAllTasks)
);

router.get(
  "/:projectId/columns/:columnId/task/:taskId",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.GetTaskById)
);

router.post(
  "/:projectId/columns/:columnId/task",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.CreateTask)
);

router.patch(
  "/:projectId/columns/:columnId/task/:taskId",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.UpdateTask)
);

router.delete(
  "/:projectId/columns/:columnId/task/:taskId",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.DeleteTask)
);

// SUBTASK
router.get(
  "/:projectId/task/:taskId/subTask",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.GetAllSubTask)
);

router.get(
  "/:projectId/task/:taskId/subTask/:subTaskId",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.GetSubTask)
);

router.post(
  "/:projectId/task/:taskId/subTask",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.CreateSubTask)
);

router.patch(
  "/:projectId/task/:taskId/subTask/:subTaskId",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.UpdateSubTask)
);
router.delete(
  "/:projectId/task/:taskId/subTask/:subTaskId",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.DeleteSubTask)
);

router.patch(
  "/:projectId/permission",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.DeleteSubTask)
);

module.exports = router;
