require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const config = require("./utils/config");
const { createServer } = require("http");
const { Server } = require("socket.io");
const app = express();
const socket = require("./socket");
const connectToDB = require("./utils/mongodb");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.crosOrigin,
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

app.use(cookieParser());

app.get("/api", (_, res) => res.send(`Server is running.`));

httpServer.listen(config.port, () => {
  console.log(`server is runnig 🚀 on port: ${config.port}`);
  console.log(`> https://${config.host}:${config.port}`);

  connectToDB().catch((err) => console.log(`error: ${err}`));

  socket(io);
});
