import React, { useState, useEffect, useRef } from 'react';
import { Chat, ChatMessage } from './utils/storage';
import { ChatList } from './components/ChatList';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { getAllChats, saveChat, deleteChat as deleteChatFromDB } from './utils/db';

const App: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chats from IndexedDB
  useEffect(() => {
    (async () => {
      const stored = await getAllChats();
      setChats(stored);
      if (stored.length > 0) {
        setActiveChatId(stored[0].id);
      }
    })();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  const createNewChat = async () => {
    const title = prompt('Digite um nome para o novo chat:');
    if (!title) return;

    const newChat: Chat = {
      id: crypto.randomUUID(),
      title,
      createdAt: Date.now(),
      messages: [],
    };

    const updated = [newChat, ...chats];
    setChats(updated);
    setActiveChatId(newChat.id);
    await saveChat(newChat);
  };

  const sendMessage = async (text: string) => {
    if (!activeChatId) return;

    const chat = chats.find((c) => c.id === activeChatId);
    if (!chat) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const loadingMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: 'IA está digitando...',
      timestamp: Date.now(),
    };

    const updatedMessages = [...chat.messages, userMessage, loadingMessage];
    const updatedChat = { ...chat, messages: updatedMessages };

    const updatedChats = chats.map((c) => (c.id === activeChatId ? updatedChat : c));
    setChats(updatedChats);
    await saveChat(updatedChat);

    scrollToBottom();

    setTimeout(async () => {
      const finalMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `Resposta simulada para: "${text}"`,
        timestamp: Date.now(),
      };

      const cleanedMessages = updatedMessages.slice(0, -1).concat(finalMessage);
      const finalChat = { ...updatedChat, messages: cleanedMessages };

      setChats((prev) => prev.map((c) => (c.id === activeChatId ? finalChat : c)));
      await saveChat(finalChat);
    }, 1500);
  };

  const deleteChat = async (id: string) => {
    const confirmed = confirm('Deseja realmente excluir este chat?');
    if (!confirmed) return;

    const updated = chats.filter((chat) => chat.id !== id);
    setChats(updated);

    if (activeChatId === id) {
      setActiveChatId(updated[0]?.id || null);
    }

    await deleteChatFromDB(id);
  };

  const activeChat = chats.find((c) => c.id === activeChatId);

  return (
    <div className="flex h-screen">
      <ChatList chats={chats} activeChatId={activeChatId} onSelectChat={setActiveChatId} onCreateChat={createNewChat} onDeleteChat={deleteChat} />
      <main className="w-3/4 p-4 flex flex-col">
        {activeChat ? (
          <>
            <ChatWindow messages={activeChat.messages} endRef={messagesEndRef} />
            <ChatInput onSend={sendMessage} />
          </>
        ) : (
          <p className="text-gray-500">Nenhum chat selecionado.</p>
        )}
      </main>
    </div>
  );
};

export default App;
