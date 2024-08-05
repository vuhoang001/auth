const express = require("express");
const router = express.Router();
const AsynHandle = require("../helpers/AsyncHandle");
const ProjectController = require("../controllers/project.controller");
const { authentication } = require("../auth/authUtils");
const AsyncHandle = require("../helpers/AsyncHandle");

router.use(authentication);

router.get("/", AsynHandle(ProjectController.GetAllProjects));
router.post("/", AsynHandle(ProjectController.CreateProject));
router.patch("/update/:id", AsynHandle(ProjectController.UpdateProject));
router.post("/delete/:id", AsynHandle(ProjectController.DeleteProject));
router.get("/:id", AsyncHandle(ProjectController.GetProject));
module.exports = router;
