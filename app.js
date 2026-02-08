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
const authRoutes = require("./Routes/authRoutes");
const cors = require("cors");
const bodyParser = require("body-parser");

const io = new Server(httpServer, {
  cors: {
    origin: [config.corsOriginLocal, config.corsOriginOnline],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

const corsOptions = {
  origin: config.corsOrigin,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "10kb" }));
// app.use(bodyParser.json({ limit: "10kb" }));
app.use(cookieParser());

app.get("/api/v1", (_, res) => res.send(`Server is running.`));
app.use("/api/v1/auth", authRoutes);

httpServer.listen(config.port, () => {
  console.log(`server is runnig 🚀 on port: ${config.port}`);
  console.log(`> https://${config.host}:${config.port}`);

  connectToDB().catch((err) => console.log(`error: ${err}`));

  socket(io);
});
