import React from "react";
import "./RoomSelector.css";

const RoomSelector = ({ roomList, selectedRoom, onRoomSelect }) => {
  return (
    <select
      className="selector"
      value={selectedRoom}
      onChange={(e) => onRoomSelect(e.target.value)}
    >
      <option value="">Select a room</option>
      {roomList.map((room) => (
        <option key={room} value={room}>
          {room}
        </option>
      ))}
    </select>
  );
};

export default RoomSelector;
