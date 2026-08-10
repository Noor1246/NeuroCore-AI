"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Conversation = {
    id: number;
    title: string;
};

export default function ChatSidebar({

    onSelectChat,
    refresh,
    newChat,
    agent,
    sidebarOpen,
    closeSidebar

}: {

    onSelectChat: (id: number) => void;
    refresh: number;
    newChat: () => void;
    agent: string;
    sidebarOpen: boolean;
    closeSidebar: () => void;

}) {

    const [conversations, setConversations] =
        useState<Conversation[]>([]);

    async function loadConversations() {

        try {

            const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ai/conversations?agent=${agent}`
);
            const data = await res.json();

            if (Array.isArray(data)) {

                setConversations(data);

            }

        } catch (err) {

            console.error(err);

        }

    }

    useEffect(() => {

        loadConversations();

    }, [refresh, agent]);

    return (

        <aside
className={`
fixed
left-0
top-0
z-50
h-full
w-72
bg-zinc-950
border-r
border-zinc-800
flex
flex-col
transform
transition-transform
duration-300
${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
md:static
md:translate-x-0
md:flex
`}
>

            {/* Logo */}

            <div className="border-b border-zinc-800 p-4 md:p-6">

                <div className="flex items-center gap-3">

                    <div className="
                        flex
                        h-10
w-10
md:h-12
md:w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-gradient-to-br
                        from-cyan-400
                        via-blue-500
                        to-purple-600
                        text-2xl
                    ">
                        🧠
                    </div>

                    <div>

                        <h1 className="text-lg md:text-xl font-bold text-white">

                            NeuroCore AI

                        </h1>

                        <p className="hidden md:block text-xs text-zinc-400">

                            Enterprise AI OS

                        </p>

                    </div>

                </div>

            </div>

            {/* Navigation */}

            <div className="px-4 pt-5 space-y-2">

                <Link
                    href="/"
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-4
                        py-3
                        text-white
                        transition-all
                        duration-200
                        hover:bg-zinc-900
                        hover:text-cyan-400
                    "
                >
                    🏠 Dashboard
                </Link>

                <Link
                    href="/agents"
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-4
                        py-3
                        text-white
                        transition-all
                        duration-200
                        hover:bg-zinc-900
                        hover:text-cyan-400
                    "
                >
                    🤖 AI Agents
                </Link>

            </div>

            {/* New Chat */}

            <div className="p-4">

                <button

                    onClick={newChat}

                    className="
                        w-full
                        rounded-xl
                        bg-gradient-to-r
                        from-cyan-400
                        to-blue-500
                        py-3
                        font-semibold
                        text-black
                        shadow-lg
                        shadow-cyan-500/20
                        transition-all
                        hover:from-cyan-300
                        hover:to-blue-400
                        hover:scale-[1.02]
                    "

                >

                    + New Chat

                </button>

            </div>

            {/* Chats */}

            <div className="flex-1 overflow-y-auto px-4">

                <p className="mb-3 text-xs uppercase tracking-wider text-zinc-500">

                    Recent Chats

                </p>

                <div className="space-y-2">

                    {

                        conversations.map(chat => (

                            <button

                                key={chat.id}

                                onClick={() => onSelectChat(chat.id)}

                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-zinc-800
                                    bg-zinc-900/70
                                    px-4
                                    py-3
                                    text-left
                                    text-white
                                    backdrop-blur
                                    transition-all
                                    hover:border-cyan-500/40
                                    hover:bg-zinc-800
                                    hover:-translate-y-0.5
                                "

                            >

                                <div className="flex items-center gap-2">

                                    <span className="text-cyan-400">

                                        ✦

                                    </span>

                                    <span className="truncate">

                                        {chat.title}

                                    </span>

                                </div>

                            </button>

                        ))

                    }

                </div>

            </div>

            {/* Footer */}

            <div className="border-t border-zinc-800 p-3 md:p-5">

                <div className="
                    rounded-2xl
                    border
                    border-cyan-500/20
                    bg-gradient-to-br
                    from-zinc-900
                    to-zinc-950
                    p-3 md:p-4
                ">

                    <div className="flex items-center gap-2">

                        <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>

                        <p className="text-sm md:text-base font-semibold text-white">

                            {agent.charAt(0).toUpperCase() + agent.slice(1)} Agent

                        </p>

                    </div>

                    <p className="mt-1 hidden md:block text-xs text-zinc-400">

                        Ready to assist

                    </p>

                </div>

            </div>

        </aside>

    );

}