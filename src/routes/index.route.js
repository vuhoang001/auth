const express = require("express");
const router = express.Router();

router.use('/chat', require('./chat.route'))
router.use("/", require("./access.route"));
router.use("/projects", require("./project.route"));
router.use("notification", require("./notification.route"))
module.exports = router;
