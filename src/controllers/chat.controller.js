const ChatMessage = require('../models/chat.model')
const { SuccessResponse } = require('../core/success.response');
const chatService = require('../services/chat.service');

const getChatHistory = async (req, res) => {

  const otherUserId = req.query.userid
  const userId = req.user.UserId
  // try {


  //   const message = await ChatMessage.find({
  //     $or: [
  //       { senderId: userId, recipientId: otherUserId },
  //       { senderId: otherUserId, recipientId: userId }
  //     ]
  //   }).sort({ createAt: 1 })
  //   req.json(message)
  // } catch (error) {
  //   res.status(500).json({ message: error.message })
  // }

  new SuccessResponse({
    message: 'Get message success',
    metadata: await chatService.ChatHistory(userId, otherUserId)
  }).send(res)
}
module.exports = {
  getChatHistory
};