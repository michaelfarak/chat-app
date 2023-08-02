import React, { useState, useEffect } from "react";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import LoginForm from "./components/LoginForm/LoginForm";
import RoomSelector from "./components/RoomSelector/RoomSelector";

const App = () => {
  const [user, setUser] = useState(null);
  const [userColor, setUserColor] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedRooms, setSelectedRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/rooms")
      .then((response) => response.json())
      .then((data) => {
        setRoomList(data);
      })
      .catch((error) => {
        console.error("Error fetching room list", error);
      });
  }, []);

  const handleLogin = (username, selectedRoom, color) => {
    setUser(username);
    setSelectedRoom(selectedRoom);
    setSelectedRooms((prevSelectedRooms) => [
      ...prevSelectedRooms,
      selectedRoom,
    ]);
    setRoomList((prevRoomList) =>
      prevRoomList.filter((room) => room !== selectedRoom)
    );
    setUserColor(color);
  };

  const handleRoomsSelect = (room) => {
    setSelectedRoom(room);
    setSelectedRooms((prevSelectedRooms) => [...prevSelectedRooms, room]);
    setRoomList((prevRoomList) => prevRoomList.filter((r) => r !== room));
  };

  return (
    <div>
      {user ? (
        <>
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

          {roomList.length !== 0 ? (
            <RoomSelector
              roomList={roomList}
              selectedRoom={""}
              onRoomSelect={handleRoomsSelect}
            />
          ) : null}
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
