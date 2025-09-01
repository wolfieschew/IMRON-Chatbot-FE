import React, { useState } from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const { text, sender, timestamp, sources, isError } = message;
  const [showSources, setShowSources] = useState(false);
  
  const formattedTime = new Intl.DateTimeFormat('id-ID', {
    hour: 'numeric',
    minute: 'numeric'
  }).format(timestamp);

  return (
    <div className={`message ${sender}-message ${isError ? 'error' : ''}`}>
      <div className="message-bubble">
        <div className="message-content">
          <p>{text}</p>
          {sources && sources.length > 0 && (
            <div className="sources-section">
              <button 
                className="sources-toggle" 
                onClick={() => setShowSources(!showSources)}
              >
                {showSources ? 'Sembunyikan Sumber' : 'Lihat Sumber'} ({sources.length})
              </button>
              
              {showSources && (
                <div className="sources">
                  <ul>
                    {sources.map((source, idx) => (
                      <li key={idx}>
                        <div className="source-item">
                          <div className="source-content">{source.content}</div>
                          <div className="similarity-score">
                            Skor: {(1 - source.similarity).toFixed(3)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="message-timestamp">{formattedTime}</div>
      </div>
    </div>
  );
};

export default ChatMessage;