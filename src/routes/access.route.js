const express = require("express");
const router = express.Router();
const AsynHandle = require("../helpers/AsyncHandle");
const AccessController = require("../controllers/access.controller");
const { authentication } = require("../auth/authUtils");
const { uploadDisk } = require("../configs/multer.config");
const AsyncHandle = require("../helpers/AsyncHandle");

router.get("/socket", AsynHandle(AccessController.socket));

router.post("/signup", AsynHandle(AccessController.signUp));

router.post("/login", AsynHandle(AccessController.login));

router.post("/handleOTP", AsynHandle(AccessController.handleOTP));

router.post("/passwordReset", AsynHandle(AccessController.resetPassword));

// Middleware for authentication
router.use(authentication);

router.get("/GetMe", AsynHandle(AccessController.GetMe));

router.patch(
  "/GetMe",
  uploadDisk.array("files", 1),
  AsynHandle(AccessController.EditGetMe)
);

router.get("/GetAll", AsynHandle(AccessController.GetAllUser));

router.get("/GetUser/:UserId", AsynHandle(AccessController.GetUserById));

router.get("/GetByKey/:keyword", AsynHandle(AccessController.GetUserByKeyword));

router.post("/logout", AsynHandle(AccessController.logout));

router.post("/handle-refresh", AsynHandle(AccessController.handleRefreshToken));

router.post("/change-password", AsynHandle(AccessController.ChangePassword));

module.exports = router;
