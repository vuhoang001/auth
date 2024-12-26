const ChatMessage = require('../models/chat.model')
const { SuccessResponse } = require('../core/success.response');
const chatService = require('../services/chat.service');

const getChatHistory = async (req, res) => {

  const otherUserId = req.query.userid
  const userId = req.user.UserId
  new SuccessResponse({
    message: 'Get message success',
    metadata: await chatService.ChatHistory(userId, otherUserId)
  }).send(res)
}
const removeChat = async (req, res) => {
  const userId = req.user.UserId
  const messageId = req.params.messageId
  new SuccessResponse({
    message: 'Remove message success',
    metadata: await chatService.RemoveChat(userId, messageId)
  }).send(res)
}
module.exports = {
  getChatHistory, removeChat
};