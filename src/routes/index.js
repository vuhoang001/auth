const express = require("express");
const router = express.Router();

// const AsynHandle = require("../helpers/AsyncHandle");

router.use("/", require("./access.route"));

module.exports = router;
