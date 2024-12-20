const chatModel = require('../models/chat.model')
const { BadRequestError } = require('../core/error.response')

class ChatService {
  ChatHistory = async (UserId, OrtherUserId) => {

    const message = await chatModel.find({
      senderId: UserId,
      recipientId: OrtherUserId
    })
    return message
  }
}

module.exports = new ChatService()