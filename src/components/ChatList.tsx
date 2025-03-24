import React from 'react';
import { Chat } from '../utils/storage';

interface Props {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onCreateChat: () => void;
  onDeleteChat: (id: string) => void;
}


export const ChatList: React.FC<Props> = ({ chats, activeChatId, onSelectChat, onCreateChat, onDeleteChat }) => {
  return (
    <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
      <button onClick={onCreateChat} className="w-full mb-4 bg-blue-500 text-white py-2 rounded">
        + Novo Chat
      </button>
      {chats.map((chat) => (
        <div key={chat.id} className="flex items-center justify-between mb-2">
          <button onClick={() => onSelectChat(chat.id)} className={`chat-tab-button ${chat.id === activeChatId ? 'active' : ''}`}>
            {chat.title}
          </button>
          <button onClick={() => onDeleteChat(chat.id)} className="chat-tab-delete" title="Excluir chat">
            🗑️
          </button>
        </div>
      ))}
    </aside>
  );
};