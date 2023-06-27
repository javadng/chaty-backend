const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017";

const connectToDB = async () => {
  await mongoose.connect(mongoUrl);
  console.log('mongodb is ready.');
};

module.exports = connectToDB;
