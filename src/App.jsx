import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { sendMessage } from "./services/api";
import { LuBotMessageSquare } from "react-icons/lu";

const EXAMPLE_QUESTIONS = [
  "sebutkan total transaksi dari data enose",
  "Tampilkan data sensor terbaru",
  "Berapa jumlah objek yang terdeteksi hari ini?",
  "Bagaimana alur sistem dari input sampai output?",
  "Apa penyebab nilai sensor tiba-tiba naik?",
];

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedLanguage = "indonesia";
  const messagesEndRef = useRef(null);
  const quickQuestionsRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isChatOpen, isExpanded]);

  useEffect(() => {
    if (
      !isChatOpen ||
      isExpanded ||
      messages.length > 0 ||
      !quickQuestionsRef.current
    ) {
      return;
    }

    const el = quickQuestionsRef.current;
    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth;
    });
  }, [isChatOpen, isExpanded, messages.length]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = { text, sender: "user", timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await sendMessage(text, selectedLanguage);
      const botMessage = {
        text: response.answer || "Sorry, I couldn't process that request.",
        sender: "bot",
        timestamp: new Date(),
        sources: response.sources || [],
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: "Sorry, there was an error processing your request.",
        sender: "bot",
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => setIsChatOpen((prev) => !prev);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <>
      <button
        className={`chat-button ${isChatOpen ? "hidden" : ""}`}
        onClick={toggleChat}
        aria-label="Buka chatbot"
      >
        <LuBotMessageSquare className="chat-icon" />
      </button>

      <div
        className={`chat-modal ${isChatOpen ? "open" : ""} ${isExpanded ? "expanded" : ""}`}
      >
        <div className="chat-modal-header">
          <img
            className="chat-bot-avatar"
            src="/public/imron.png"
            alt="Imron"
          />
          <div className="chat-header-info">
            <h1>IMRON-Chatbot</h1>
            <p className="subtitle">Developed by KK-AITM Research</p>
          </div>

          <button
            className="expand-button"
            onClick={toggleExpand}
            title={isExpanded ? "Perkecil" : "Perlebar"}
          >
            {isExpanded ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="10" y1="14" x2="3" y2="21" />
                <line x1="21" y1="3" x2="14" y2="10" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
            )}
          </button>

          <button className="close-button" onClick={toggleChat}>
            ×
          </button>
        </div>

        <div className="chat-modal-body">
          <div className="messages-container">
            {messages.length === 0 && (
              <div className="welcome-message">
                <h2>Selamat datang di IMRON-Chatbot!</h2>
                <p>Silakan ajukan pertanyaan anda.</p>
              </div>
            )}

            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}

            {loading && (
              <div className="message bot-message loading">
                <div className="typing-bubble">
                  <span className="typing-text">mengetik</span>
                  <span className="typing-dots">
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length === 0 && (
            <div className="quick-questions-wrap">
              <div
                ref={quickQuestionsRef}
                className="suggestion-chips quick-questions-scroll"
              >
                {EXAMPLE_QUESTIONS.map((question, index) => (
                  <button
                    key={`${question}-${index}`}
                    type="button"
                    className="suggestion-chip quick-question-chip"
                    onClick={() => handleSendMessage(question)}
                    disabled={loading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
      </div>
    </>
  );
}

export default App;
