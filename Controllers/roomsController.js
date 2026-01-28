const EVENTS = require("../utils/events");
const { v4: uuidv4 } = require("uuid");

module.exports = (io, socket) => {
  const rooms = {};

  const createPrivateRoom = async (roomName) => {
    const roomId = uuidv4();

    rooms[roomId] = {
      roomName,
    };

    socket.join(roomId);

    socket.emit(EVENTS.SERVER.ROOMS, rooms);
    socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

    socket.emit(EVENTS.SERVER.JOINED_ROOM, { roomId, roomName });
  };

  const joinPrivateChat = (roomId) => {
    socket.join(roomId);

    socket.emit(EVENTS.SERVER.JOINED_ROOM, { roomId });
  };

  socket.on(EVENTS.CLIENT.CEREATE_PRIVATE_CHAT, createPrivateRoom);
  socket.on(EVENTS.CLIENT.JOIN_PRIVATE_CHAT, joinPrivateChat);
};
