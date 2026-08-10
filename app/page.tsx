"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Bot,
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  ArrowRight,
  LogOut,
  ChevronDown
} from "lucide-react";
import AuthGuard from "@/components/AuthGuard";

const agents = [
  {
    name: "General Assistant",
    icon: "🤖",
    href: "/chat",
    description: "Everyday conversations and general AI assistance."
  },
  {
    name: "Coding Agent",
    icon: "💻",
    href: "/chat?agent=coding",
    description: "Programming, debugging and DSA help."
  },
  {
    name: "Research Agent",
    icon: "🔬",
    href: "/chat?agent=research",
    description: "Research papers, analysis and explanations."
  },
  {
    name: "Resume Agent",
    icon: "📄",
    href: "/chat?agent=resume",
    description: "ATS optimization and interview preparation."
  },
  {
    name: "Data Analyst",
    icon: "📊",
    href: "/chat?agent=data",
    description: "Python, SQL and data visualization."
  },
  {
    name: "Writing Assistant",
    icon: "✍️",
    href: "/chat?agent=writing",
    description: "Professional writing, blogs and documentation."
  }
];

export default function DashboardPage() {
const [user,setUser] = useState<any>(null);
const [open,setOpen] = useState(false);
useEffect(()=>{

    const token = localStorage.getItem("token");


    if(!token){
        return;
    }


    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {

        headers:{
            Authorization:`Bearer ${token}`
        }

    })
    .then(res=>res.json())
    .then(data=>{
        setUser(data);
    })


},[]);

  return (
    <AuthGuard>

    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}

      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur">

        <div className="
mx-auto
flex
max-w-7xl
flex-col
gap-5
px-6
py-5
lg:flex-row
lg:items-center
lg:justify-between
">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-cyan-500 p-2">

              <Bot className="h-5 w-5 text-black"/>

            </div>

            <div>

              <h1 className="text-xl font-bold">
                NeuroCore AI
              </h1>

              <p className="text-xs text-zinc-500">
                Enterprise AI Workspace
              </p>

            </div>

          </div>
<div className="flex items-center gap-4">


{
user && (

<div className="relative">


<button
onClick={()=>setOpen(!open)}
className="
flex
items-center
gap-3
rounded-xl
border
border-white/10
bg-white/5
px-3
py-2
transition
hover:bg-white/10
"
>


<div
className="
flex
h-9
w-9
items-center
justify-center
rounded-full
bg-cyan-500
font-bold
text-black
"
>

{user.name?.charAt(0).toUpperCase()}

</div>


<div className="hidden text-left sm:block">

<p className="text-sm font-medium">
{user.name}
</p>

<p className="text-xs text-zinc-500">
{user.email}
</p>

</div>


<ChevronDown
size={16}
className="text-zinc-400"
/>


</button>



{
open && (

<div
className="
absolute
right-0
mt-3
w-52
rounded-xl
border
border-white/10
bg-zinc-950
p-2
shadow-xl
"
>


<button
className="
w-full
rounded-lg
px-3
py-2
text-left
text-sm
text-zinc-300
hover:bg-white/10
"
>
Profile
</button>



<button
onClick={()=>{

localStorage.removeItem("token");
window.location.href="/login";

}}
className="
flex
w-full
items-center
gap-2
rounded-lg
px-3
py-2
text-left
text-sm
text-red-400
hover:bg-red-500/10
"
>

<LogOut size={16}/>

Logout

</button>


</div>

)
}


</div>

)
}


</div>
          <nav className="flex flex-wrap items-center gap-2">

            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-black"
            >
              <LayoutDashboard size={18}/>
              Dashboard
            </Link>

            <Link
              href="/chat"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              <MessageSquare size={18}/>
              AI Chat
            </Link>

            <Link
              href="/agents"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              <Sparkles size={18}/>
              Agents
            </Link>

          </nav>

        </div>

      </header>

      {/* Content */}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}

        {/* Hero Header */}

<div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">


  <div>


    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">

      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"/>

      NeuroCore AI Online

    </div>



    <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">

      Your AI
      <span className="text-cyan-400">
        {" "}Operating System
      </span>

    </h2>



    <p className="mt-4 max-w-xl text-zinc-400">

      Deploy intelligent agents, analyze documents,
      and collaborate with specialized AI assistants
      from one unified workspace.

    </p>


  </div>



  <Link
    href="/chat"
    className="
    group
    flex
    items-center
    gap-3
    rounded-xl
    bg-cyan-500
    px-6
    py-3
    font-medium
    text-black
    transition
    hover:bg-cyan-400
    "
  >

    Start New Chat

    <ArrowRight
      size={18}
      className="transition group-hover:translate-x-1"
    />

  </Link>


</div>
{/* AI Metrics */}

<div className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


  {[
    {
      title: "AI Agents",
      value: "6",
      description: "Specialized assistants",
      icon: "🤖"
    },
    {
      title: "Conversations",
      value: "128",
      description: "AI interactions",
      icon: "💬"
    },
    {
      title: "Documents",
      value: "32",
      description: "Knowledge sources",
      icon: "📄"
    },
    {
      title: "AI Status",
      value: "Online",
      description: "All systems active",
      icon: "⚡"
    }
  ].map((stat)=>(
    

    <div
      key={stat.title}
      className="
      rounded-2xl
      border
      border-white/10
      bg-white/5
      p-5
      backdrop-blur-xl
      transition-all
      hover:-translate-y-1
      hover:border-cyan-400/40
      "
    >


      <div className="flex items-center justify-between">


        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-xl">

          {stat.icon}

        </div>


      </div>



      <h4 className="mt-5 text-3xl font-bold">

        {stat.value}

      </h4>


      <p className="mt-1 font-medium">

        {stat.title}

      </p>


      <p className="mt-1 text-sm text-zinc-500">

        {stat.description}

      </p>


    </div>


  ))}


</div>

        <section>

          <div className="mb-8">

            <h3 className="text-2xl font-semibold">
              AI Agents
            </h3>

            <p className="mt-2 text-zinc-500">
              Select a specialized assistant for your task.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

            {agents.map((agent) => (

              <Link
                key={agent.name}
                href={agent.href}
                className="
                  group
                  flex
                  flex-col
                  rounded-2xl
                  border
                  border-zinc-800
                  bg-zinc-900
                  p-5
                  transition-all
                  hover:-translate-y-1
                  hover:border-cyan-500
                "
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-2xl">

                  {agent.icon}

                </div>

                <h4 className="mt-5 text-lg font-semibold">

                  {agent.name}

                </h4>

                <p className="mt-2 flex-1 text-sm leading-6 text-zinc-400">

                  {agent.description}

                </p>

                <div className="mt-6 flex items-center justify-between">

                  <span className="text-sm font-medium text-cyan-400">

                    Start Chat

                  </span>

                  <ArrowRight
                    size={16}
                    className="text-cyan-400 transition group-hover:translate-x-1"
                  />

                </div>

              </Link>

            ))}

          </div>

        </section>

        {/* Bottom Section */}
                <div className="mt-12 grid gap-8 lg:grid-cols-2">

  {/* Recent Conversations */}

  <section>

    <div className="mb-6 flex items-center justify-between">

      <h3 className="text-xl font-semibold">
        Recent Conversations
      </h3>

      <Link
        href="/chat"
        className="text-sm text-cyan-400 hover:text-cyan-300"
      >
        View all
      </Link>

    </div>


    <div className="space-y-4">

      {[
        {
          icon: "💻",
          title: "FastAPI Authentication",
          agent: "Coding Agent",
          time: "Today",
          href: "/chat?agent=coding"
        },
        {
          icon: "📄",
          title: "Resume Review",
          agent: "Resume Agent",
          time: "Yesterday",
          href: "/chat?agent=resume"
        },
        {
          icon: "🔬",
          title: "RAG Paper Analysis",
          agent: "Research Agent",
          time: "2 days ago",
          href: "/chat?agent=research"
        }
      ].map((chat)=>(


        <Link
          key={chat.title}
          href={chat.href}
          className="
          group
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-5
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-cyan-400/50
          hover:bg-cyan-400/5
          "
        >

          <div className="flex items-center gap-4">


            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-cyan-500/20
              to-blue-500/20
              text-xl
              "
            >
              {chat.icon}
            </div>


            <div>

              <h4 className="font-medium">
                {chat.title}
              </h4>

              <p className="text-sm text-zinc-400">
                {chat.agent} • {chat.time}
              </p>

            </div>


          </div>


          <ArrowRight
            size={18}
            className="
            text-zinc-500
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:text-cyan-400
            "
          />


        </Link>


      ))}

    </div>


  </section>



  {/* Explore */}


  <section>


    <div className="mb-6">

      <h3 className="text-xl font-semibold">
        Explore
      </h3>

      <p className="mt-1 text-sm text-zinc-500">
        Jump into NeuroCore AI capabilities.
      </p>

    </div>



    <div className="space-y-4">


      {[
        {
          icon:"💬",
          title:"AI Chat",
          desc:"Start chatting with NeuroCore AI.",
          href:"/chat",
          color:"cyan"
        },
        {
          icon:"🤖",
          title:"AI Agents",
          desc:"Browse specialized assistants.",
          href:"/agents",
          color:"purple"
        },
        {
          icon:"📄",
          title:"Document Intelligence",
          desc:"Upload PDFs and query knowledge.",
          href:"/chat",
          color:"green"
        }
      ].map((item)=>(


        <Link
          key={item.title}
          href={item.href}
          className="
          group
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-5
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-cyan-400/50
          "
        >


          <div className="flex items-center gap-4">


            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-cyan-500/10
              text-xl
              "
            >
              {item.icon}
            </div>


            <div>

              <h4 className="font-medium">
                {item.title}
              </h4>

              <p className="text-sm text-zinc-400">
                {item.desc}
              </p>

            </div>


          </div>


          <ArrowRight
            size={18}
            className="
            text-cyan-400
            transition-transform
            duration-300
            group-hover:translate-x-1
            "
          />


        </Link>


      ))}


    </div>


  </section>
</div>

</div>

    </main>
    </AuthGuard>

  );

}