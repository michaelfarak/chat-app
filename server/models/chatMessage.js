const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  user: String,
  text: String,
  timeStamp: { type: Date, default: Date.now() },
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

module.exports = ChatMessage;
