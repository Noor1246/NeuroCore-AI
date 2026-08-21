# NeuroCore AI

### Enterprise AI Operating System

NeuroCore AI is a full-stack AI platform that combines conversational AI, intelligent agents, document-based RAG, semantic memory, authentication, and vector search into a unified workspace.

It provides users with persistent conversations, document understanding, contextual retrieval, and specialized AI workflows through a modern web interface.

**Live Application:** https://neuro-core-ai.vercel.app

**Backend API:** https://neurocore-ai-g124.onrender.com

---

## ✨ Features

* **AI Chat** — Interactive conversational AI with persistent conversations.
* **AI Agents** — Specialized agent workflows for different tasks.
* **RAG Pipeline** — Upload documents and retrieve relevant context using semantic search.
* **Document Processing** — PDF ingestion, text extraction, and chunking.
* **Semantic Memory** — Stores useful long-term conversation information and retrieves relevant memories.
* **Vector Search** — ChromaDB-based similarity search for documents and conversation memory.
* **Authentication** — User registration, login, and protected application workflows.
* **Conversation Management** — Create, retrieve, and manage multiple conversations.
* **Responsive UI** — Modern Next.js interface designed for desktop and mobile.
* **Production Deployment** — Frontend deployed on Vercel and backend deployed on Render.

---

## 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │      Next.js UI      │
                         │      Vercel          │
                         └──────────┬───────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌──────────────────────┐
                         │      FastAPI         │
                         │      Render          │
                         └──────────┬───────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
           ┌────────────┐   ┌──────────────┐   ┌──────────────┐
           │ PostgreSQL │   │   ChromaDB   │   │ AI / Agents  │
           │    Data    │   │ Vector Store │   │   Pipeline    │
           └────────────┘   └──────────────┘   └──────────────┘
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                         ▼                     ▼
                  Document RAG          Conversation Memory
```

---

## 🧠 AI & RAG Pipeline

NeuroCore AI uses a retrieval-augmented architecture to ground responses in user-provided information.

### Document workflow

```text
PDF Upload
    ↓
Text Extraction
    ↓
Text Chunking
    ↓
Local Embedding Generation
    ↓
ChromaDB Vector Storage
    ↓
Semantic Similarity Search
    ↓
Relevant Context
    ↓
AI Response
```

### Conversation memory

Relevant user information can be identified and stored as semantic memories.

```text
User Message
    ↓
Memory Filtering
    ↓
Embedding Generation
    ↓
ChromaDB
    ↓
Semantic Retrieval
    ↓
Context-aware Response
```

The production deployment uses ChromaDB's lightweight local embedding functionality, avoiding heavyweight transformer-based embedding models.

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Axios

### Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* Pydantic
* REST APIs

### AI / ML

* Retrieval-Augmented Generation (RAG)
* Semantic Search
* Vector Embeddings
* AI Agents
* Prompt Engineering
* Context Retrieval

### Vector Database

* ChromaDB

### Database

* PostgreSQL

### Authentication & Security

* Token-based authentication
* Password hashing
* CORS configuration
* Protected API workflows

### Deployment

* Vercel — Frontend
* Render — Backend

---

## 📁 Project Structure

```text
NeuroCore-AI/
│
├── app/                       # Next.js frontend
│   ├── agents/
│   ├── chat/
│   ├── documents/
│   ├── login/
│   ├── register/
│   └── page.tsx
│
├── components/                # Reusable React components
│   ├── ChatBox.tsx
│   ├── ChatSidebar.tsx
│   ├── AgentCard.tsx
│   ├── UploadBox.tsx
│   └── ModelSelector.tsx
│
├── lib/                       # Frontend utilities
│   └── api.ts
│
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   ├── api/
│   │   ├── core/
│   │   ├── documents/
│   │   ├── memory/
│   │   ├── services/
│   │   └── tools/
│   │
│   └── requirements.txt
│
├── public/
├── package.json
├── next.config.ts
└── README.md
```

---

## 🚀 Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/Noor1246/NeuroCore-AI.git
cd NeuroCore-AI
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure frontend environment

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 4. Start the backend

```bash
cd backend

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload --port 8000
```

### 5. Start the frontend

From the project root:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🔐 Environment Variables

### Frontend

```env
NEXT_PUBLIC_API_URL=
```

### Backend

Configure the required backend secrets in your local `.env` file.

Never commit `.env`, API keys, database credentials, or other secrets to GitHub.

---

## ☁️ Deployment

The production architecture separates the frontend and backend.

### Frontend

The Next.js application is deployed using Vercel.

```text
Next.js
   ↓
Vercel
   ↓
https://neuro-core-ai.vercel.app
```

### Backend

The FastAPI API is deployed using Render.

```text
FastAPI
   ↓
Render
   ↓
https://neurocore-ai-g124.onrender.com
```

The frontend communicates with the backend through REST APIs using the production backend URL.

---

## 🔌 Core API Routes

| Endpoint                 | Purpose                      |
| ------------------------ | ---------------------------- |
| `GET /health`            | Health check                 |
| `POST /auth/register`    | Register a user              |
| `POST /auth/login`       | Authenticate a user          |
| `POST /ai/chat`          | Send a chat request          |
| `POST /ai/new-chat`      | Create a conversation        |
| `GET /ai/conversations`  | Retrieve conversations       |
| `POST /documents/upload` | Upload and process documents |
| `GET /models/`           | Retrieve available models    |

---

## 📊 Key Engineering Concepts

NeuroCore AI demonstrates practical implementation of:

* REST API design
* Full-stack application architecture
* Authentication and authorization
* Database modeling
* Vector databases
* Semantic similarity search
* Retrieval-Augmented Generation
* Document processing pipelines
* AI agent orchestration
* Persistent conversational memory
* API integration
* Production deployment
* CORS and cross-origin communication
* Frontend/backend separation

---

## 🔮 Future Improvements

* Streaming AI responses
* More specialized AI agents
* Advanced memory ranking and decay
* Hybrid keyword + semantic retrieval
* Conversation summarization
* Background document processing
* Redis-based caching
* Asynchronous task queues
* Observability and request tracing
* Improved document metadata filtering
* Multi-user document workspaces

---

## 👨‍💻 Author

**Noor Chopra**

B.Tech — Electrical Engineering
National Institute of Technology, Delhi

GitHub: https://github.com/Noor1246

---

## ⭐ Project

If you find NeuroCore AI interesting, consider giving the repository a star.

**NeuroCore AI — one workspace for conversational AI, agents, memory, and retrieval.**
