const mongoose = require("mongoose");
const mongoUrl =
  process.env.MONGO_URL ||
  "mongodb+srv://javadng:joeA8mfzOcNKdPCQ@insta-clone.q06zcpr.mongodb.net/?retryWrites=true&w=majority";

const connectToDB = async () => {
  await mongoose.connect(mongoUrl);
  console.log("mongodb is ready.");
};

module.exports = connectToDB;
