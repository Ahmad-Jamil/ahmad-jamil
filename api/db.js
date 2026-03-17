const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;

  // Prefer using the explicit database name. For SRV URIs, this avoids relying on
  // driver defaults and helps prevent connection issues.
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DBNAME || "portfolio",
  });

  console.log("MongoDB connected → portfolio DB");
}

module.exports = connectDB;
