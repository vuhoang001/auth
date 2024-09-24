// server.js
const app = require("./src/app");
const { initSocket } = require("./src/configs/socket.config");
const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
initSocket(server); // Khởi tạo Socket.io

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Xử lý tín hiệu kết thúc
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit server express");
  });
});
