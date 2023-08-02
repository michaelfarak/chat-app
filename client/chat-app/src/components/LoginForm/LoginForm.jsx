import React, { useState } from "react";
import RoomSelector from "../RoomSelector/RoomSelector";

const LoginForm = ({ onLogin, roomList }) => {
  const [username, setUsername] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "" && selectedRoom !== "") {
      onLogin(username, selectedRoom);
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <RoomSelector
          roomList={roomList}
          selectedRoom={selectedRoom}
          onRoomSelect={handleRoomSelect}
        />
        <button type="submit" disabled={!username || !selectedRoom}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
