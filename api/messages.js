const express = require("express");
const connectDB = require("./db");
const Message = require("./models/Messages");

const router = express.Router();

// Insert a new message
router.post("/", async (req, res) => {
  try {
    await connectDB();
    const msg = await Message.create(req.body);
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all messages
router.get("/", async (req, res) => {
  try {
    await connectDB();
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
