const Notification = require('../src/models/notification.model')


const userSockets = ({})
const socketIO = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room theo projectId
    socket.on('join_project', (projectId) => {
      socket.join(projectId);
      console.log(`User ${socket.id} joined project ${projectId}`);
    });
    socket.on('task:notification', async (data) => {
      try {
        const notification = new Notification({
          projectId: data.projectId,
          message: data.message,
          type: data.type,
          user: data.user,
          taskName: data.taskName,
          createdAt: new Date()
        });
        await notification.save();

        socket.to(data.projectId).emit('receive_notification', notification);
      } catch (error) {
        console.error('Error saving notification:', error);
      }
    });

    socket.on('register', ({ userId }) => {
      userSockets[userId] = socket.id
      console.log(`User ${userId} registered with socket ID ${socket.id}`);
    })

    socket.on('chat:message', (data) => {
      const { user, recipientId, message } = data;
      if (userSockets[recipientId]) {
        io.to(userSockets[recipientId]).emit('chat:message', {
          user,
          message,
          timestamp: new Date()
        });
        socket.to(userSockets[recipientId]).emit('receive_notification', data);

      } else {
        console.log(`Recipient ${recipientId} is not connected.`);
      }
    });
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = socketIO;