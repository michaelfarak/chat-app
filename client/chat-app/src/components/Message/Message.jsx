import React from "react";

const Message = ({ message }) => {
  return (
    <div>
      <strong>{message.user}</strong>: {message.text}
    </div>
  );
};

export default Message;
