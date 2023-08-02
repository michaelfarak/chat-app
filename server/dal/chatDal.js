const ChatRoom = require("../models/chatRoom");

const saveMessage = async (room, user, text) => {
  try {
    await ChatRoom.findOneAndUpdate(
      { name: room },
      { $push: { messages: { user, text } } },
      { upsert: true }
    );
  } catch (err) {
    console.error("Error saving message to database", err);
    throw err;
  }
};

module.exports = { saveMessage };
