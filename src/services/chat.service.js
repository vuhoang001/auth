const chatModel = require('../models/chat.model')
const { BadRequestError } = require('../core/error.response')
const { convertToObjectIdMongose } = require('../utils/index')
class ChatService {
  ChatHistory = async (UserId, OrtherUserId) => {
    const message = await chatModel.find({
      $or: [
        { senderId: UserId, recipientId: OrtherUserId },
        { senderId: OrtherUserId, recipientId: UserId }
      ]
    }).sort({ createdAt: 1 })
      .populate({
        path: 'senderId',
        select: 'name email'
      })
    if (!message) {
      throw new BadRequestError()
    }
    return message
  }
  RemoveChat = async (UserId, messageId) => {
    if (!UserId) return
    const message = await chatModel.findByIdAndUpdate(
      convertToObjectIdMongose(messageId), {
      status: false
    })
    return message
  }
}

module.exports = new ChatService()