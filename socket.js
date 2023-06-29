const { parse } = require("cookie");
const { authSocket } = require("./Controllers/authController");
const chatController = require("./Controllers/chatController");
const roomsController = require("./Controllers/roomsController");
const EVENTS = require("./utils/events");
const jwt = require("jsonwebtoken");

const socket = (io) => {
  io.on(EVENTS.connection, (socket) => {
    console.log("new connection " + Math.random());

    authSocket(io, socket);
    roomsController(io, socket);
    chatController(io, socket);
  });
};

module.exports = socket;
