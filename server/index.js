const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const connectDB = require("./config/db.js");

const app = express();
const server = require("http").Server(app);

const chatServer = require("./sockets/socketServer.js");
const ChatRoom = require("./models/chatRoom");
const ChatMessage = require("./models/chatMessage");
const User = require("./models/user");
const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");
const predefinedRooms = require("./const/predefinedRooms.js");

dotenv.config();
const port = process.env.PORT || 1337;

const startServer = async () => {
  try {
    await connectDB();

    await Promise.all([
      ChatMessage.deleteMany({}),
      ChatRoom.deleteMany({}),
      User.deleteMany({}),
    ]);

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

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "sessions",
});

store.on("error", (error) => {
  console.error("Session store error:", error);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/", chatRoutes);

startServer();
