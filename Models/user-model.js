const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "A user most have name!"],
  },
  email: {
    type: String,
    require: [true, "a user most have Email!"],
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    require: [true, "You most set a unique username!"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    require: [true, "Please provide a valid Password"],
    minLegnth: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, "Please confirm Your password."],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  photo: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (candidatePass, userPass) {
  return await bcrypt.compare(candidatePass, userPass);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
