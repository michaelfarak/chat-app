import React, { useState, useEffect } from "react";
import Message from "../Message/Message";
import io from "socket.io-client";

import EmojiPicker from "emoji-picker-react";
import "./ChatRoom.css";

//TODO: Implement edit message ability
const ChatRoom = ({ username, selectedRoom, userColor }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [pickerClicked, setPickerClicked] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:1337");
    setSocket(newSocket);
    newSocket.emit("joinRoom", selectedRoom);

    newSocket.on("chatHistory", (history) => {
      setMessages(history);
    });
    newSocket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [selectedRoom]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      const newMessage = {
        user: username,
        userColor: userColor,
        text: inputMessage,
        room: selectedRoom,
      };
      if (socket) {
        socket.emit("message", newMessage);
      }

      setInputMessage("");
    }
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleEmojiClick = (emojiObject) =>
    setInputMessage(
      (previousInputMessage) => previousInputMessage + emojiObject.emoji
    );

  return (
    <div className="room-container">
      <h1>Room {capitalizeFirst(selectedRoom)} </h1>
      <h3>Welcome {username}</h3>
      <div className="messages-container">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <form className="input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="input-message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button
          type="button"
          className="toggle-emoji-btn"
          onClick={(e) => {
            e.preventDefault();
            setPickerClicked((clicked) => !clicked);
          }}
        >
          &#9786;
        </button>

        <button type="submit" style={{ display: "none" }}></button>
      </form>
      <div className={`picker-container ${pickerClicked ? "show" : ""}`}>
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </div>
    </div>
  );
};

export default ChatRoom;
