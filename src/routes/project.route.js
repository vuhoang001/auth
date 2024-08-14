const express = require("express");
const router = express.Router();
const AsynHandle = require("../helpers/AsyncHandle");
const ProjectController = require("../controllers/project.controller");
const { authentication } = require("../auth/authUtils");
const AsyncHandle = require("../helpers/AsyncHandle");
const { handleValidationErrors } = require("../middlewares/validate/validate");
const {
  createProjectValidator,
} = require("../middlewares/validate/project.validate");

router.get("/", AsynHandle(ProjectController.GetAllProjects));
router.use(authentication);
router.post(
  "/",
  createProjectValidator(),
  handleValidationErrors,
  AsyncHandle(ProjectController.CreateProject)
);

router.patch("/:id", AsynHandle(ProjectController.UpdateProject));
router.delete("/:id", AsynHandle(ProjectController.DeleteProject));
router.get("/:id", AsyncHandle(ProjectController.GetProject));

module.exports = router;
