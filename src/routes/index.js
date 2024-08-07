const express = require("express");
const router = express.Router();

// const AsynHandle = require("../helpers/AsyncHandle");

router.use("/project", require("./project.route"));
router.use("/task", require('./task.route'))
router.use("/", require("./access.route"));

module.exports = router;
