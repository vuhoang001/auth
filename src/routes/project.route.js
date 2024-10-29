const express = require("express");
const router = express.Router();
const AsynHandle = require("../helpers/AsyncHandle");
const ProjectController = require("../controllers/project.controller");
const columnController = require("../controllers/column.controller");
const taskController = require("../controllers/task.controller");
const notiController = require("../controllers/notification.controller")
const {
  authentication,
  checkStatusProject,
  checkPermission,
} = require("../auth/authUtils");
const AsyncHandle = require("../helpers/AsyncHandle");
const projectController = require("../controllers/project.controller");

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

//Comment

router.post(
  "/:projectId/columns/:columnId/task/:taskId/comment",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.CreateComment)
);

router.delete(
  "/:projectId/columns/:columnId/task/:taskId/comment/:commentId",
  checkStatusProject,
  checkPermission,
  AsyncHandle(taskController.DeleteComment)
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

router.post(
  "/:projectId/permission",
  checkStatusProject,
  checkPermission,
  AsyncHandle(projectController.Permission)
);

router.post(
  "/:projectId/permission/add",
  checkStatusProject,
  checkPermission,
  AsyncHandle(projectController.AddMemberToProject)
);


// NOTI
router.get(
  "/:projectId/notifications",
  checkStatusProject,
  checkPermission,
  AsyncHandle(notiController.getNotifications)
);
module.exports = router;
