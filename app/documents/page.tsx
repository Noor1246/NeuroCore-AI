"use client";

import UploadBox from "@/components/UploadBox";

export default function DocumentsPage() {

    return (

        <div className="min-h-screen bg-black text-white p-8">

            <h1 className="text-4xl font-bold mb-2">

                📄 Document Intelligence

            </h1>

            <p className="text-zinc-400 mb-8">

                Upload documents and chat with them.

            </p>

            <UploadBox
                conversationId={null}
                onNewChat={()=>{}}
            />

        </div>

    );

}