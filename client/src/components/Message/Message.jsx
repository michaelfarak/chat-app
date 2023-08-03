import React from "react";

const Message = ({ message }) => {
  return (
    <div style={{ color: message.userColor }}>
      <strong>{message.user}</strong>: {message.text}
    </div>
  );
};

export default Message;
