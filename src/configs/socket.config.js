// src/configs/socket.config.js
const socketIo = require("socket.io");

let io; // Biến toàn cục để lưu đối tượng io

const initSocket = (server) => {
  io = socketIo(server);

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (msg) => {
      console.log("Message received: " + msg);
      io.emit("message", msg); // Gửi lại tin nhắn cho tất cả người dùng
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized");
  }
  return io;
};

module.exports = { initSocket, getIo };
