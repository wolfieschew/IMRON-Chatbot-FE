import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const { text, sender, timestamp, isError } = message;

  const formattedTime = new Intl.DateTimeFormat('id-ID', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(timestamp);

  return (
    <div className={`message ${sender}-message ${isError ? 'error' : ''}`}>

      {sender === 'bot' && (
        <div className="message-avatar bot-avatar">
          <img src="/public/imron.png" alt="IMRON" />
        </div>
      )}

      <div className="message-bubble">
        <div className="message-content">{text}</div>
        <div className="message-timestamp">{formattedTime}</div>
      </div>

      {sender === 'user' && (
        <div className="message-avatar user-avatar">
          <span>U</span>
        </div>
      )}

    </div>
  );
};

export default ChatMessage;
