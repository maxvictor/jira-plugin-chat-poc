# 🧠 Jira Plugin Chat POC

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/Status-POC--Frontend--Completa-brightgreen)

Uma prova de conceito de um **plugin de chat com IA para o Jira**, com múltiplos chats, histórico salvo em IndexedDB e uma estrutura bem organizada para futura evolução com backend, IA real e integração com Jira.

---

## 🗂️ Estrutura de Pastas

```
root/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── style.css
│   ├── App.tsx
│   ├── components/
│   │   ├── ChatList.tsx
│   │   ├── ChatWindow.tsx
│   │   └── ChatInput.tsx
│   └── utils/
│       ├── db.ts
│       └── storage.ts
```

---

## 🚀 Funcionalidades Atuais

- 💬 Múltiplos chats com histórico independente
- 💾 Persistência local via **IndexedDB** (utilizando a lib `idb`)
- 🧠 IA simulada com loading e delay de resposta
- 🧑‍💻 Identificação visual de quem enviou cada mensagem (usuário ou IA)
- 🗑️ Botão para **excluir chats com confirmação**
- ✍️ Criação de **título personalizado** para cada chat
- 🔽 **Scroll automático** até a última mensagem
- 💄 Interface limpa, responsiva e com CSS customizado

---

## 📦 Tecnologias Utilizadas

- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [idb](https://www.npmjs.com/package/idb) para IndexedDB

---

## 🛠️ Como rodar o projeto localmente

```bash
git clone https://github.com/maxvictor/jira-plugin-chat-poc.git
cd jira-plugin-chat-poc
yarn install
yarn dev
```

A aplicação estará disponível em: `http://localhost:3000`

---

## 💡 Melhorias futuras no Frontend

- [ ] Animação de "IA está digitando..." mais dinâmica
- [ ] Dark Mode 🌙
- [ ] Interface com design system (ex: Tailwind, Chakra)
- [ ] Exportar conversa como PDF ou Markdown
- [ ] Tradução/multi-idioma (i18n)
- [ ] Testes com Vitest ou Cypress

---

## 🧱 Próximos passos - Backend (planejamento)

### 🔧 Stack sugerida

- **Linguagem**: Node.js com TypeScript
- **Framework**: Fastify ou Express
- **Banco de dados**: PostgreSQL ou MongoDB
- **ORM**: Prisma ou TypeORM
- **Autenticação**: JWT (futuramente OAuth com Jira)

### 📐 Estrutura de dados

```ts
User {
  id: string
  email: string
  name?: string
}

Chat {
  id: string
  userId: string
  title: string
  createdAt: Date
}

Message {
  id: string
  chatId: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}
```

### 🔌 Endpoints básicos

| Método | Rota                  | Descrição                     |
|--------|------------------------|-------------------------------|
| GET    | `/users/me`           | Dados do usuário autenticado |
| GET    | `/chats`              | Lista de chats do usuário    |
| POST   | `/chats`              | Criar novo chat               |
| DELETE | `/chats/:id`          | Remover chat                  |
| POST   | `/chats/:id/messages` | Enviar mensagem ao chat      |
| GET    | `/chats/:id/messages` | Buscar mensagens              |

### 🔐 Autenticação (simulada inicialmente)

- JWT com token fixo
- OAuth com Jira (etapa futura)

### ☁️ Deploy sugerido

- Railway, Render, Fly.io ou AWS (EC2/Lambda)

---

## 🤝 Contribuição

Esse projeto é uma POC interna em constante evolução. Fique à vontade para criar um fork, sugerir melhorias ou adaptar para seu time ou empresa.

---

## ✨ Status do Projeto

- 🚀 **Fase 1 finalizada com sucesso (Frontend Completo)**
- 📦 Pronto para evoluir com Backend e integração real com IA e Jira
