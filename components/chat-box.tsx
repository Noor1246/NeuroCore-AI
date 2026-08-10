"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ChatBox() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);


  async function sendMessage() {

    if(!message) return;

    setLoading(true);

    try {

      const res = await api.post(
        "/ai/chat",
        {
          message: message
        }
      );


      setResponse(
        res.data.response
      );


    } catch(error){

      setResponse(
        "Something went wrong"
      );

    }


    setLoading(false);
  }


  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">

      <textarea
        className="border rounded-lg p-3"
        placeholder="Ask NeuroCore AI..."
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />


      <button
        onClick={sendMessage}
        className="bg-black text-white rounded-lg p-3"
      >
        {
          loading 
          ? "Thinking..."
          : "Ask AI"
        }
      </button>


      {
        response && (
          <div className="border rounded-lg p-4 whitespace-pre-wrap">
            {response}
          </div>
        )
      }

    </div>
  );
}