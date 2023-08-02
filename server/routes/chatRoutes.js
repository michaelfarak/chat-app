const express = require("express");
const router = express.Router();
const chatHandlers = require("../handlers/chatHandlers");

router.get("/rooms", chatHandlers.getRooms);
router.post("/messages/edit", chatHandlers.editMessage);

module.exports = router;
