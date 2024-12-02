const Notification = require('../src/models/notification.model')

const socketIO = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room theo projectId
    socket.on('join_project', (projectId) => {
      socket.join(projectId);
      console.log(`User ${socket.id} joined project ${projectId}`);
    });
    socket.on('chat:message', (data) => {
      socket.emit('chat:message', {
        user: data.user,
        message: data.message,
        timestamp: new Date()
      })
    })
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

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = socketIO;