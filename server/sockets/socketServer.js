const socketio = require("socket.io");
const { saveMessage } = require("../dal/chatDal");
const ChatRoom = require("../models/chatRoom");
const predefinedRooms = require("../const/predefinedRooms");

const chatServer = (server) => {
  const io = socketio(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on("joinRoom", async (room) => {
      if (predefinedRooms.includes(room)) {
        socket.join(room);
        console.log(`Socket ${socket.id} joined room: ${room}`);

        try {
          const chatRoom = await ChatRoom.findOne({ name: room });
          if (chatRoom) {
            console.log(chatRoom);
            socket.emit("chatHistory", chatRoom.messages);
          }
        } catch (error) {
          console.error(
            `Error fetching chat room ${room} from database`,
            error
          );
        }
      } else {
        console.log(`Room ${room} does not exist or is not allowed`);
      }
    });

    socket.on("message", async (message) => {
      try {
        const { room, user, text, userColor } = message;
        await saveMessage(room, user, text, userColor);
        io.to(room).emit("message", { room, user, text, userColor });
      } catch (err) {
        console.error("Error saving message to database", err);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
};

module.exports = chatServer;
