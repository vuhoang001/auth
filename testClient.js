// testClient.js
const io = require("socket.io-client");

const socket = io("http://localhost:3000"); // Địa chỉ server

// Khi kết nối
socket.on("connect", () => {
  console.log("Connected to server");

  // Gửi một tin nhắn
  const message = "Hello from test client!";
  socket.emit("message", message);
  console.log(`Sent message: ${message}`);

  // Nhận tin nhắn từ server
  socket.on("message", (msg) => {
    console.log(`Received from serverrr: ${msg}`);
  });
});

// Khi ngắt kết nối
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
