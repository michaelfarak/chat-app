// models/chatRoom.js
const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  messages: [
    {
      user: String,
      text: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
