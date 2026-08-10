"use client";

import { useRouter } from "next/navigation";
import AgentCard from "@/components/agents/AgentCard";

const agents = [
  {
    name: "General Assistant",
    icon: "🤖",
    description: "General conversations, brainstorming and everyday tasks.",
    prompt: "general",
  },
  {
    name: "Coding Agent",
    icon: "💻",
    description: "Programming, debugging, DSA and software development.",
    prompt: "coding",
  },
  {
    name: "Research Agent",
    icon: "🔬",
    description: "Research papers, analysis and technical explanations.",
    prompt: "research",
  },
  {
    name: "Resume Agent",
    icon: "📄",
    description: "ATS optimization, resumes and interview preparation.",
    prompt: "resume",
  },
  {
    name: "Data Analyst",
    icon: "📊",
    description: "Python, SQL, analytics and data visualization.",
    prompt: "data",
  },
  {
    name: "Writing Assistant",
    icon: "✍️",
    description: "Emails, blogs, reports and professional writing.",
    prompt: "writing",
  },
];

export default function AgentsPage() {
  const router = useRouter();

  function openAgent(agent: string) {
    router.push(`/chat?agent=${agent}`);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-8 py-12">

        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            AI Agents
          </h1>

          <p className="mt-2 text-zinc-400">
            Choose a specialized AI assistant to start your conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr">

          {agents.map((agent) => (
            <AgentCard
              key={agent.name}
              {...agent}
              onClick={() => openAgent(agent.prompt)}
            />
          ))}

        </div>
      </div>
    </main>
  );
}