// Vercel Serverless Function – messages stored in MongoDB
require("dotenv").config();
const connectDB = require("./db");
const Message = require("./models/Messages");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set (add it in Vercel Project Settings → Environment Variables)");
    return res.status(500).json({
      error: "Server misconfiguration: MongoDB URI not set",
      hint: "Add MONGODB_URI in Vercel dashboard for this project",
    });
  }

  try {
    await connectDB();
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return res.status(500).json({
      error: "Database connection failed",
      message: err.message,
    });
  }

  try {
    if (req.method === "GET") {
      const messages = await Message.find().sort({ _id: -1 });
      return res.status(200).json(messages);
    }

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (!body || (!body.name && !body.message)) {
        return res.status(400).json({ error: "name and message are required" });
      }
      const msg = await Message.create(body);
      return res.status(201).json({ message: "Message saved to MongoDB", data: msg });
    }
  } catch (err) {
    console.error("Messages API error:", err);
    return res.status(500).json({ error: err.message });
  }
};
