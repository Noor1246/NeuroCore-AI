"use client";

import { useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
export default function UploadBox({

    conversationId,
    onNewChat

}:{

    conversationId: number | null;
    onNewChat: () => void;

}) {

    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    async function uploadFile() {

        if (!file) {

            toast.warning("Please choose a file first.");
return;
            return;

        }

        if (!conversationId) {

            toast.warning("Please create or select a chat first.");
return;
            return;

        }

        setLoading(true);

        setMessage("");

        const formData = new FormData();

        formData.append("file", file);

        formData.append(
            "conversation_id",
            conversationId.toString()
        );

        try {

            const response = await api.post(
    "/ai/upload",
    formData
);

setMessage(response.data.message);
toast.success(response.data.message);

setFile(null);
        } catch {

            setMessage("Upload failed.");
toast.error("Upload failed.");

        }

        setLoading(false);

    }

    return (

        <div className="mb-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3">

    <div className="mb-3 flex items-center justify-between">

    <h2 className="text-sm font-medium text-zinc-300">
        Upload Document
    </h2>

    

</div>

    <div className="flex items-center gap-3">

        <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={(e)=>{
                if(e.target.files){
                    setFile(e.target.files[0]);
                }
            }}
        />

        <label
            htmlFor="file-upload"
            className="
                cursor-pointer
                rounded-lg
                bg-cyan-500
                px-4
                py-2
                font-medium
                text-black
                hover:bg-cyan-400
            "
        >
            Choose File
        </label>

        <span className="flex-1 truncate text-sm text-zinc-400">
            {file ? file.name : "No file selected"}
        </span>

        <button
            onClick={uploadFile}
            disabled={loading || !file}
            className="
                rounded-lg
                bg-white
                px-4
                py-2
                text-black
                disabled:bg-zinc-700
                disabled:text-zinc-500
            "
        >
            {loading ? "Uploading..." : "Upload"}
        </button>

    </div>

    {message && (
        <p className="mt-2 text-sm text-green-400">
            {message}
        </p>
    )}

</div>

    );

}