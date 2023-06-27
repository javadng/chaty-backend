const { serialize, parse } = require("cookie");
const EVENTS = require("../utils/events");
const jwt = require("jsonwebtoken");

const rooms = {};

module.exports = (io, socket) => {
  const sendPrivateMessage = async (payload) => {
    const { roomId, message, reciverUser, type, sender } = payload;
    const date = new Date().toISOString();
    // send back to client
    socket.to(roomId).emit(EVENTS.SERVER.PRIVATE_MESSAGE, {
      time: date,
      message,
      type,
      sender,
      reciverUser,
    });
  };

  socket.on(EVENTS.CLIENT.SEND_PRIVATE_MESSAGE, sendPrivateMessage);
};
