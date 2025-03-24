import React, { useState } from 'react';

interface Props {
  onSend: (text: string) => void;
}

export const ChatInput: React.FC<Props> = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="chat-input">
      <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Digite sua mensagem..." />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
};
