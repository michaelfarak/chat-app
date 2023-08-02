const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

const app = express();
const server = require("http").Server(app);

const chatServer = require("./sockets/socketServer.js");
const ChatRoom = require("./models/chatRoom");
const ChatMessage = require("./models/chatMessage");
const chatRoutes = require("./routes/chatRoutes");
const predefinedRooms = require("./const/predefinedRooms.js");

dotenv.config();
const port = process.env.PORT || 1337;

const startServer = async () => {
  try {
    await connectDB();

    await Promise.all([ChatMessage.deleteMany({}), ChatRoom.deleteMany({})]);

    for (const room of predefinedRooms) {
      await ChatRoom.create({ name: room, message: [] });
    }
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

    chatServer(server);
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.json());

app.use("/", chatRoutes);

startServer();
