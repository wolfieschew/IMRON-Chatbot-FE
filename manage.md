# App.jsx

<!-- import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { sendMessage } from './services/api';
import { LuBotMessageSquare } from "react-icons/lu";

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    

    const userMessage = { text, sender: 'user', timestamp: new Date() };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setLoading(true);
    try {

      const response = await sendMessage(text);
      
      const botMessage = { 
        text: response.answer || "Sorry, I couldn't process that request.", 
        sender: 'bot', 
        timestamp: new Date(),
        sources: response.sources || [] 
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        text: "Sorry, there was an error processing your request.", 
        sender: 'bot', 
        timestamp: new Date(),
        isError: true
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      {/* Floating chat button */}
      <div className={`chat-button ${isChatOpen ? 'hidden' : ''}`} onClick={toggleChat}>
        <div className="chat-icon"><LuBotMessageSquare /></div>
      </div>

      {/* Chat modal */}
      <div className={`chat-modal ${isChatOpen ? 'open' : ''}`}>
        <div className="chat-modal-header">
          <h1>RAG-Powered IMRON-Chatbot</h1>
          <p className="subtitle">Under Development by Bagas V0.1</p>
          <button className="close-button" onClick={toggleChat}>×</button>
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
                <div className="loading-indicator">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
      </div>
    </div>
  );
}

export default App; -->







# Api.js


<!-- // import axios from 'axios';

// const API_URL = 'http://127.0.0.1:5000/api';

// export const sendMessage = async (text) => {
//   try {
//     const response = await axios.post(`${API_URL}/chat`, { query: text });
//     return response.data;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// }; -->