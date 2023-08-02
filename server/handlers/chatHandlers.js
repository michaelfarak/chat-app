const ChatRoom = require("../models/chatRoom");
const predefinedRooms = require("../const/predefinedRooms.js");

const getRooms = (req, res) => {
  res.json(predefinedRooms);
};

const editMessage = async (req, res) => {
  const { messageId, text, room } = req.body;

  try {
    //TODO
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(`Error editing message in room ${room}`, error);
    res.status(500).json({ error: "Error editing message" });
  }
};

module.exports = { getRooms, editMessage };
