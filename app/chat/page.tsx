"use client";

import { Suspense, useState } from "react";
import { Menu, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ChatSidebar from "@/components/ChatSidebar";
import ChatBox from "@/components/ChatBox";
import UploadBox from "@/components/UploadBox";
import api from "@/lib/api";
function ChatPageContent(){
    const searchParams = useSearchParams();

const agent =
    searchParams.get("agent") || "general";

    const [
        selectedConversationId,
        setSelectedConversationId
    ] = useState<number | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);
    async function handleNewChat() {

    const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ai/new-chat?agent=${agent}`,
    {
        method: "POST"
    }
);

    const data = await res.json();

    setSelectedConversationId(
        data.conversation_id
    );

    setRefresh(prev => prev + 1);

}


    return (

        <main className="flex h-screen overflow-hidden bg-black flex-col md:flex-row">
{
    sidebarOpen && (
        <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
        />
    )
}
    <ChatSidebar
    refresh={refresh}
    newChat={handleNewChat}
    agent={agent}
    sidebarOpen={sidebarOpen}
    closeSidebar={() => setSidebarOpen(false)}
    onSelectChat={(id) => {
        setSelectedConversationId(id);
        setSidebarOpen(false);
    }}
/>

    <div className="flex flex-1 min-h-0 flex-col overflow-hidden">

    {/* Mobile Header */}

    <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 p-4 md:hidden">

        <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 hover:bg-zinc-800"
        >
            <Menu size={22} className="text-white" />
        </button>

        <h1 className="font-semibold text-white">
            NeuroCore AI
        </h1>

        <div className="w-8" />

    </div>

        <div className="shrink-0">
            <UploadBox
    conversationId={selectedConversationId}
    onNewChat={handleNewChat}
/>
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">

            <ChatBox
                selectedConversationId={selectedConversationId}
                agent={agent}
                onMessageSent={() => setRefresh(prev => prev + 1)}
            />

        </div>

    </div>

</main>

    );

}

export default function ChatPage() {
    return (
        <Suspense fallback={<div className="text-white">Loading...</div>}>
            <ChatPageContent />
        </Suspense>
    );
}