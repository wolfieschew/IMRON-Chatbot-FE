import React, { useState, useEffect, useRef } from "react";
import "./ChatMessage.css";

// Kecepatan typing: jumlah karakter per tick (ms)
const TYPING_SPEED_MS = 60; // delay antar karakter (ms)

const ChatMessage = ({ message }) => {
  const {
    text,
    sender,
    timestamp,
    isError,
    isTyping: isLoadingTyping,
  } = message;

  // isLoadingTyping = true  => bubble "..." (sedang menunggu respons API)
  // sender === "bot" & teks ada => jalankan typing effect
  const isBot = sender === "bot";

  const [displayedText, setDisplayedText] = useState(
    // Jika bukan bot, langsung tampilkan semua teks (pesan user)
    isBot ? "" : text,
  );
  const [isDoneTyping, setIsDoneTyping] = useState(!isBot);
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Reset saat teks berubah (misal stream baru)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isLoadingTyping]);

  const formattedTime = new Intl.DateTimeFormat("id-ID", {
    hour: "numeric",
    minute: "numeric",
  }).format(timestamp);

  // Bubble loading "..." (menunggu respons dari API)
  if (isLoadingTyping) {
    return (
      <div className={`message bot-message loading`}>
        <div className="message-avatar bot-avatar">
          {message.botAvatar ? <img src={message.botAvatar} alt="bot" /> : null}
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
      className={`message ${isBot ? "bot-message" : "user-message"} ${
        isError ? "error" : ""
      }`}
    >
      {isBot && (
        <div className="message-avatar bot-avatar">
          {message.botAvatar ? <img src={message.botAvatar} alt="bot" /> : null}
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
