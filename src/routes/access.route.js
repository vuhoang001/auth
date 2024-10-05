const express = require("express");
const router = express.Router();
const AsynHandle = require("../helpers/AsyncHandle");
const AccessController = require("../controllers/access.controller");
const { authentication } = require("../auth/authUtils");
const upload = require("../configs/multer.config");

router.get("/socket", AsynHandle(AccessController.socket));
router.post(
  "/upload",
  upload.single("file"),
  AsynHandle(AccessController.Upload)
);

router.post("/signup", AsynHandle(AccessController.signUp));

router.post("/login", AsynHandle(AccessController.login));

router.post("/handleOTP", AsynHandle(AccessController.handleOTP));

router.post("/passwordReset", AsynHandle(AccessController.resetPassword));

// Middleware for authentication
router.use(authentication);

router.use("/GetMe", AsynHandle(AccessController.GetMe));

router.get("/GetAll", AsynHandle(AccessController.GetAllUser));

router.get("/GetUser/:UserId", AsynHandle(AccessController.GetUserById));

router.post("/logout", AsynHandle(AccessController.logout));

router.post("/handle-refresh", AsynHandle(AccessController.handleRefreshToken));

module.exports = router;
