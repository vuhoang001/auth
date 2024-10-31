const Notification = require('../src/models/notification.model')

const socketIO = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Join room theo projectId
    socket.on('join_project', (projectId) => {
      socket.join(projectId);
      console.log(`User ${socket.id} joined project ${projectId}`);
    });

    // Lắng nghe sự kiện task:notification
    socket.on('task:notification', (data) => {
      // Chỉ gửi thông báo đến các users trong cùng project
      socket.to(data.projectId).emit('receive_notification', {
        type: data.type,
        projectId: data.projectId,
        taskName: data.taskName,
        user: data.user,
        message: data.message,
        timestamp: new Date()
      });
    });

    // Lưu notification vào database (nếu cần)
    socket.on('task:notification', async (data) => {
      try {
        // Tạo model notification (ví dụ)
        const notification = new Notification({
          type: data.type,
          projectId: data.projectId,
          taskName: data.taskName,
          user: data.user,
          message: data.message,
          createdAt: new Date()
        });
        await notification.save();

        // Broadcast to project room
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