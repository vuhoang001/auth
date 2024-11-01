const { Schema, model } = require('mongoose')

const notificationSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['create', 'update', 'delete', 'status'],
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  taskName: {
    type: String,
    required: true
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Notification', notificationSchema);
