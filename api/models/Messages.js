const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    name: String,
    message: String,
    datetime: String
  },
  { collection: "messages" }
);

module.exports = mongoose.models.Message || mongoose.model("Message", MessageSchema);
