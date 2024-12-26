const express = require("express");
const router = express.Router();
// const AsynHandle = require("../helpers/AsyncHandle");
const chatController = require('../controllers/chat.controller');
const AsyncHandle = require("../helpers/AsyncHandle");
const { authentication } = require('../auth/authUtils')

router.use(authentication)
router.get("/", AsyncHandle(chatController.getChatHistory))
router.post('/remove/:messageId', AsyncHandle(chatController.removeChat))
module.exports = router


