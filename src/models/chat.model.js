const { Schema, model } = require('mongoose')

const chatMessageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  recipientId: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isRead: {
    type: Boolean,
    default: false
  }
});
chatMessageSchema.index({ senderId: 1, recipientId: 1 });
module.exports = model('ChatMessage', chatMessageSchema);
