const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

// Schema for your existing "messages" collection
const MessageSchema = new mongoose.Schema(
  {
    name: String,
    message: String,
    datetime: String
  },
  { collection: "messages" } // use your existing collection
);

const Message = mongoose.model("Message", MessageSchema);

async function run() {
  try {
    // IMPORTANT: force mongoose to use the "portfolio" database
    await mongoose.connect(uri, { dbName: "portfolio" });

    console.log("Connected to MongoDB (portfolio DB)");

    const newMessage = {
      name: "Ahmad",
      message: "Testing insert into portfolio.messages",
      datetime: new Date().toISOString()
    };

    const inserted = await Message.create(newMessage);

    console.log("Inserted document:");
    console.log(inserted);

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();
