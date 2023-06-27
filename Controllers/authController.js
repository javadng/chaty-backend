const User = require("../Models/user-model");
const jwt = require("jsonwebtoken");
const { parse, serialize } = require("cookie");

const EVENTS = require("../utils/events");

const signToken = (user) => {
  const { _id, username } = user;

  return jwt.sign({ _id, username }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000,
  });
};

const createSendToken = (user, socket) => {
  const token = signToken(user);

  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOption.secure = true;

  // Remove password from output
  user.password = undefined;

  socket.emit(EVENTS.SERVER.AUTH.SUCCESS, {
    token,
    data: {
      user,
    },
  });
};

module.exports = (io, socket) => {
  const login = async (payload) => {
    try {
      const { username, password } = payload;

      const user = await User.findOne({ username }).select("+password");
      if (!user) throw new Error("user not found!");

      isPasswordCorrect = await user.correctPassword(password, user.password);
      if (!isPasswordCorrect) throw new Error("Password not correct!");

      createSendToken(user, socket);
    } catch (error) {
      socket.emit(EVENTS.SERVER.AUTH.ERROR, {
        message: error.message,
        data: {},
      });
    }
  };

  const signUp = async (payload) => {
    try {
      const newUser = await User.create({
        name: payload.name,
        email: payload.email,
        username: payload.username,
        password: payload.password,
        passwordConfirm: payload.passwordConfirm,
      });

      createSendToken(newUser, socket);
    } catch (error) {
      socket.emit(EVENTS.SERVER.AUTH.ERROR, {
        message: error.message,
        data: {},
      });
    }
  };

  const sendBackJWT = () => {
    const cookies = parse(socket.handshake.headers.cookie);
    const decodedCookie = jwt.decode(cookies.jwt);

    socket.emit(EVENTS.SERVER.AUTH.SENDBACK_JWT_COOKIE, decodedCookie);
  };

  socket.on(EVENTS.CLIENT.AUTH.LOGIN, login);
  socket.on(EVENTS.CLIENT.AUTH.SENDBACK_JWT_COOKIE, sendBackJWT);
  socket.on(EVENTS.CLIENT.AUTH.SIGNUP, signUp);
};
