const ChatMessage = require('../models/chat.model')

const getChatHistory = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params

    const message = await ChatMessage.find({
      $or: [
        { senderId: userId, recipientId: otherUserId },
        { senderId: otherUserId, recipientId: userId }
      ]
    }).sort({ createAt: 1 })
    req.json(message)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
module.exports = {
  getChatHistory
};