const chatModel = require('../models/chat.model')
const { BadRequestError } = require('../core/error.response')

class ChatService {
  ChatHistory = async (UserId, OrtherUserId) => {

    const message = await chatModel.find({
      $or: [
        { senderId: UserId, recipientId: OrtherUserId },
        { senderId: OrtherUserId, recipientId: UserId }
      ]
    }).sort({ createAt: 1 })
    return message
  }
}

module.exports = new ChatService()