const express = require("express");
const router = express.Router();
const AsynHandle = require("../helpers/AsyncHandle");
const ColumnController = require("../controllers/column.controller");
const { authentication } = require("../auth/authUtils");
const AsyncHandle = require("../helpers/AsyncHandle");

router.post("/:id", AsyncHandle(ColumnController.CreateColumn));
router.get("/", AsyncHandle(ColumnController.GetAllColumn));
router.get("/:id", AsyncHandle(ColumnController.GetColumn));
router.patch("/:id", AsyncHandle(ColumnController.UpdateColumn));
router.delete("/:id", AsyncHandle(ColumnController.DeleteColumn));
router.use(authentication);

module.exports = router;
