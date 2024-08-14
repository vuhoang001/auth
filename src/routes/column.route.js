const express = require("express");
const router = express.Router();
const ColumnController = require("../controllers/column.controller");
const { authentication } = require("../auth/authUtils");
const AsyncHandle = require("../helpers/AsyncHandle");
const { handleValidationErrors } = require("../middlewares/validate/validate");
const {
  createColumnValidator,
} = require("../middlewares/validate/column.validate");

router.post(
  "/:id",
  createColumnValidator(),
  handleValidationErrors,
  AsyncHandle(ColumnController.CreateColumn)
);
router.get("/", AsyncHandle(ColumnController.GetAllColumn));
router.get("/:id", AsyncHandle(ColumnController.GetColumn));
router.patch("/:id", AsyncHandle(ColumnController.UpdateColumn));
router.delete("/:id", AsyncHandle(ColumnController.DeleteColumn));
router.use(authentication);

module.exports = router;
