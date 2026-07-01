import React, { useState, useEffect, useRef } from "react";
import "./ChatMessage.css";

const TYPING_SPEED_MS = 60;

const ChatMessage = ({ message }) => {
  const {
    text,
    sender,
    timestamp,
    isError,
    isTyping: isLoadingTyping,
  } = message;

  const isBot = sender === "bot";

  const [displayedText, setDisplayedText] = useState(
    isBot ? "" : text,
  );
  const [isDoneTyping, setIsDoneTyping] = useState(!isBot);
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isBot || isLoadingTyping) return;

    indexRef.current = 0;
    setDisplayedText("");
    setIsDoneTyping(false);

    const type = () => {
      if (indexRef.current < text.length) {
        indexRef.current += 1;
        setDisplayedText(text.slice(0, indexRef.current));
        timerRef.current = setTimeout(type, TYPING_SPEED_MS);
      } else {
        setIsDoneTyping(true);
      }
    };

    timerRef.current = setTimeout(type, TYPING_SPEED_MS);

    return () => clearTimeout(timerRef.current);
  }, [text, isLoadingTyping]);

  const formattedTime = new Intl.DateTimeFormat("id-ID", {
    hour: "numeric",
    minute: "numeric",
  }).format(timestamp);

  if (isLoadingTyping) {
    return (
      <div className={`message bot-message loading`}>
        <div className="message-avatar bot-avatar">
          <img src={message.botAvatar || "/public/imron.png"} alt="bot" />
        </div>
        <div className="typing-bubble">
          <span className="typing-text">Mengetik</span>
          <span className="typing-dots">
            <span className="dot dot1" />
            <span className="dot dot2" />
            <span className="dot dot3" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`message ${isBot ? "bot-message" : "user-message"} ${isError ? "error" : ""
        }`}
    >
      {isBot && (
        <div className="message-avatar bot-avatar">
          <img src={message.botAvatar || "/public/imron.png"} alt="bot" />
        </div>
      )}

      <div className="message-bubble">
        <div className="message-content">
          {displayedText}
          {/* Kursor berkedip selama typing berlangsung */}
          {isBot && !isDoneTyping && (
            <span className="typing-cursor" aria-hidden="true" />
          )}
        </div>
        {isDoneTyping && (
          <div className="message-timestamp">{formattedTime}</div>
        )}
      </div>

      {!isBot && (
        <div className="message-avatar user-avatar">
          {message.userInitial || "U"}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
