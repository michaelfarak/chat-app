import React, { useState, useEffect } from "react";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import LoginForm from "./components/LoginForm/LoginForm";
import RoomSelector from "./components/RoomSelector/RoomSelector";
import "./App.css";

//TODO: learn and implement Redux state management

const App = () => {
  const [user, setUser] = useState(null);
  const [userColor, setUserColor] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);

  useEffect(() => {
    fetchRoomList();
  }, []);

  const fetchRoomList = async () => {
    try {
      const response = await fetch("http://localhost:1337/rooms");
      const roomListData = await response.json();
      setRoomList(roomListData);
    } catch (error) {
      console.error("Error fetching room list", error);
    }
  };

  const handleLogin = (username, selectedRoom, color) => {
    setUser(username);
    setUserColor(color);
    setSelectedRoom(selectedRoom);
    addSelectedRoom(selectedRoom);
    removeRoomFromList(selectedRoom);
  };

  const handleRoomsSelect = (room) => {
    setSelectedRoom(room);
    addSelectedRoom(room);
    removeRoomFromList(room);
  };

  const addSelectedRoom = (room) => {
    setSelectedRooms((prevSelectedRooms) => [...prevSelectedRooms, room]);
  };

  const removeRoomFromList = (room) => {
    setRoomList((prevRoomList) => prevRoomList.filter((r) => r !== room));
  };

  return (
    <div>
      {user ? (
        <>
          {roomList.length !== 0 && (
            <RoomSelector
              roomList={roomList}
              selectedRoom={""}
              onRoomSelect={handleRoomsSelect}
            />
          )}
          <div className="rooms-container">
            {selectedRooms.map((room) => (
              <ChatRoom
                key={room}
                username={user}
                selectedRoom={room}
                userColor={userColor}
              />
            ))}
          </div>
        </>
      ) : (
        <LoginForm
          onLogin={handleLogin}
          roomList={roomList}
          selectedRoom={selectedRoom}
          onRoomSelect={handleRoomsSelect}
        />
      )}
    </div>
  );
};

export default App;
