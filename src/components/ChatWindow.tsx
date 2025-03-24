import React, { RefObject } from 'react';
import { ChatMessage } from '../utils/storage';

interface Props {
  messages: ChatMessage[];
  endRef: RefObject<HTMLDivElement>;
}

export const ChatWindow: React.FC<Props> = ({ messages, endRef }) => {
  return (
    <div className="messages">
      {messages.length > 0 ? (
        messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.role === 'user' ? 'user' : 'assistant'}`}>
            <span className="message-icon">{msg.role === 'user' ? '🧑‍💻' : '🤖'}</span>
            <span>{msg.content}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Nenhuma mensagem ainda.</p>
      )}
      <div ref={endRef} />
    </div>
  );
};
