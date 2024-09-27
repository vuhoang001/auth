const express = require("express");
const router = express.Router();

router.use("/", require("./access.route"));
router.use("/projects", require("./project.route"));

module.exports = router;
