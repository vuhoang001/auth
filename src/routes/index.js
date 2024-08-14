const express = require("express");
const router = express.Router();

router.use("/projects", require("./project.route"));
router.use("/tasks", require("./task.route"));
router.use("/columns", require("./column.route"));
router.use("/", require("./access.route"));

module.exports = router;
