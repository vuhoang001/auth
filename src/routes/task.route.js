const express = require("express");
const router = express.Router();
const AsyncHandle = require("../helpers/AsyncHandle");
const TaskController = require("../controllers/task.controller");
const { authentication } = require("../auth/authUtils");
const { handleValidationErrors } = require("../middlewares/validate/validate");
const {
  createTaskValidator,
} = require("../middlewares/validate/task.validate");
// router.use(authentication);
router.post(
  "/:id",
  createTaskValidator(),
  handleValidationErrors,
  AsyncHandle(TaskController.CreateTask)
);
router.get("/", AsyncHandle(TaskController.GetAllTasks));
router.get("/:id", AsyncHandle(TaskController.GetTaskById));
router.patch("/:id", AsyncHandle(TaskController.UpdateTask));
router.delete("/:id", AsyncHandle(TaskController.DeleteTask));
module.exports = router;
