const mongoose = require("mongoose");
const mongoUrl =
  process.env.MONGO_URL ||
  "mongodb+srv://javadng3424_db_user:6Z6I9AI7PPy2TF9W@cluster0.manlatj.mongodb.net/?appName=Cluster0";

const connectToDB = async () => {
  await mongoose.connect(mongoUrl);
  console.log("mongodb is ready.");
};

module.exports = connectToDB;
