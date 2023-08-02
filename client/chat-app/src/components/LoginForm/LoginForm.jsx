import React, { useState } from "react";
import axios from "axios";
import RoomSelector from "../RoomSelector/RoomSelector";
import "./LoginForm.css";

const LoginForm = ({ onLogin, roomList }) => {
  const [username, setUsername] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  // const [userColor, setUserColor] = useState("");

  const API_URL = "http://localhost:1337/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() !== "" && selectedRoom !== "") {
      try {
        const response = await axios.post(API_URL, { username: username });

        const { color } = response.data;

        // setUserColor(color);

        onLogin(username, selectedRoom, color);
      } catch (error) {
        console.log("Error while registering user: ", error);
        window.alert("Error registering user. Please try again later.");
      }
    } else {
      window.alert("Please enter a username and select a room");
    }
  };

  const handleRoomSelect = (roomName) => {
    setSelectedRoom(roomName);
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="username-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <RoomSelector
          roomList={roomList}
          selectedRoom={selectedRoom}
          onRoomSelect={handleRoomSelect}
        />
        <button
          className="submit-btn"
          type="submit"
          disabled={!username || !selectedRoom}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
