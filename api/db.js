const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "portfolio"
  });

  console.log("MongoDB connected → portfolio DB");
}

module.exports = connectDB;
