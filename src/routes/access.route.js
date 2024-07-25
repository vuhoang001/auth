const express = require("express");
const router = express.Router();
const AsynHandle = require("../helpers/AsyncHandle");
const AccessController = require("../controllers/access.controller");
const { authentication } = require("../auth/authUtils");

router.post("/signup", AsynHandle(AccessController.signUp));
router.post("/login", AsynHandle(AccessController.login));
router.get("/handleOTP", AsynHandle(AccessController.handleOTP));
router.post("/passwordReset", AsynHandle(AccessController.resetPassword));
router.use(authentication);

router.post("/logout", AsynHandle(AccessController.logout));
router.post(
  "/handle-refresh-token",
  AsynHandle(AccessController.handleRefreshToken)
);

module.exports = router;
