import { openDB } from 'idb';
import { Chat } from './storage';

const DB_NAME = 'chat-ai-db';
const STORE_NAME = 'chats';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function getAllChats(): Promise<Chat[]> {
  const db = await getDB();
  const all = await db.getAll(STORE_NAME);
  return all.sort((a, b) => b.createdAt - a.createdAt);
}

export async function saveChat(chat: Chat) {
  const db = await getDB();
  await db.put(STORE_NAME, chat);
}

export async function deleteChat(id: string) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}
