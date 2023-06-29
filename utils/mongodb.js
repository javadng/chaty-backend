const mongoose = require("mongoose");
const mongoUrl =
  process.env.MONGO_URL ||
  "mongodb+srv://javadng3424:OKEcmN1uo0C87B3A@cluster0.qtxxgej.mongodb.net/?retryWrites=true&w=majority";

const connectToDB = async () => {
  await mongoose.connect(mongoUrl);
  console.log("mongodb is ready.");
};

module.exports = connectToDB;
