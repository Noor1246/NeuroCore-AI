"use client";

import Link from "next/link";


export default function Sidebar(){

    return(
        <aside className="w-64 h-screen bg-black text-white p-6">

            <h1 className="text-2xl font-bold mb-10">
                NeuroCore AI
            </h1>


            <nav className="space-y-4">

                <Link 
                    href="/dashboard"
                    className="block hover:text-gray-300"
                >
                    🏠 Dashboard
                </Link>


                <Link 
                    href="/chat"
                    className="block hover:text-gray-300"
                >
                    💬 AI Chat
                </Link>


                <Link 
                    href="/documents"
                    className="block hover:text-gray-300"
                >
                    📄 Documents
                </Link>


                <Link 
                    href="/agents"
                    className="block hover:text-gray-300"
                >
                    🤖 AI Agents
                </Link>


                <Link 
                    href="/analytics"
                    className="block hover:text-gray-300"
                >
                    📊 Analytics
                </Link>


            </nav>

        </aside>
    );
}