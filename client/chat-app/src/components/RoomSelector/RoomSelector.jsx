import React from "react";

const RoomSelector = ({ roomList, selectedRoom, onRoomSelect }) => {
  return (
    <select value={selectedRoom} onChange={(e) => onRoomSelect(e.target.value)}>
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
