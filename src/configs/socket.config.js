const { Server } = require('socket.io');
const socketIO = require('../socket');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  socketIO(io);

  return io;
};

module.exports = { initSocket };