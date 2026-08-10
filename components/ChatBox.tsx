"use client";

import { useState, useEffect, useRef } from "react";

import ModelSelector from "@/components/ModelSelector";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
    Prism as SyntaxHighlighter
} from "react-syntax-highlighter";

import {
    oneDark
} from "react-syntax-highlighter/dist/esm/styles/prism";


type Message = {
    role: "user" | "ai";
    content: string;
};


const agentDetails: any = {

    coding: {
        name: "Coding Agent",
        icon: "💻",
        description: "Programming, debugging and DSA"
    },

    research: {
        name: "Research Agent",
        icon: "🔬",
        description: "Research papers and analysis"
    },

    resume: {
        name: "Resume Agent",
        icon: "📄",
        description: "ATS optimization and interview prep"
    },

    data: {
        name: "Data Analyst",
        icon: "📊",
        description: "Python, SQL and visualization"
    },

    writing: {
        name: "Writing Assistant",
        icon: "✍️",
        description: "Emails, blogs and documentation"
    },

    general: {
        name: "General Assistant",
        icon: "🤖",
        description: "Your intelligent AI assistant"
    }

};



export default function ChatBox({

    selectedConversationId,
    agent,
    onMessageSent

}: {

    selectedConversationId: number | null;
    agent: string;
    onMessageSent: () => void;

}) {


    const [message,setMessage] =
        useState("");


    const [messages,setMessages] =
        useState<Message[]>([]);


    const [loading,setLoading] =
        useState(false);


    const [conversationId,setConversationId] =
        useState<number | null>(null);



    const messagesEndRef =
        useRef<HTMLDivElement>(null);


    const messagesContainerRef =
        useRef<HTMLDivElement>(null);


    const autoScrollRef =
        useRef(true);



    function useSuggestion(text:string){

        setMessage(text);

    }



    useEffect(()=>{


        if(!autoScrollRef.current)
            return;


        messagesEndRef.current?.scrollIntoView({

            block:"end"

        });


    },[messages]);



    useEffect(()=>{


        setMessages([]);


        async function loadMessages(){


            if(!selectedConversationId)
                return;



            const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ai/conversations/${selectedConversationId}/messages`
);


            const data = await response.json();



            if(!Array.isArray(data)){

                setMessages([]);

                return;

            }



            setMessages(

                data.map((msg:any)=>({

                    role:
                        msg.role==="assistant"
                        ?
                        "ai"
                        :
                        msg.role,


                    content:msg.content

                }))

            );



            setConversationId(
                selectedConversationId
            );


        }



        loadMessages();



    },[selectedConversationId]);



    async function sendMessage(){


        if(!message.trim())
            return;



        const userMessage = message;



        setMessages(prev=>[

            ...prev,

            {

                role:"user",

                content:userMessage

            }

        ]);



        setMessage("");

        setLoading(true);



        try{


            const response = await fetch(

                `${process.env.NEXT_PUBLIC_API_URL}/ai/chat`,

                {

                    method:"POST",

                    headers:{

                        "Content-Type":
                        "application/json"

                    },


                    body:JSON.stringify({

                        message:userMessage,


                        conversation_id:
                            selectedConversationId ??
                            conversationId,


                        agent:agent

                    })


                }

            );


            if(!response.body){

                throw new Error(
                    "No response body"
                );

            }



            const newId =
                response.headers.get(
                    "X-Conversation-ID"
                );



            if(newId){

                setConversationId(
                    Number(newId)
                );

            }



            const reader =
                response.body.getReader();


            const decoder =
                new TextDecoder();



            let aiMessage = "";



            setMessages(prev=>[

                ...prev,

                {

                    role:"ai",

                    content:""

                }

            ]);



            while(true){


                const {

                    done,
                    value

                } = await reader.read();



                if(done)
                    break;



                const chunk =
                    decoder.decode(value);



                aiMessage += chunk;



                setMessages(prev=>{


                    const updated =
                        [...prev];



                    updated[
                        updated.length-1
                    ]={

                        role:"ai",

                        content:aiMessage

                    };



                    return updated;


                });


            }



            onMessageSent();


        }
        catch(error){


            console.error(error);



            setMessages(prev=>[

                ...prev,

                {

                    role:"ai",

                    content:
                    "❌ Something went wrong."

                }

            ]);


        }



        setLoading(false);


    }
        return (

        <div className="
            flex
            h-full
            min-h-0
            flex-col
            overflow-hidden
            bg-zinc-950
        ">


            {/* Header */}

            <div className="
                shrink-0
                flex
                items-center
                justify-between
                border-b
                border-zinc-800
                px-4 md:px-6
py-3 md:py-4
            ">


                <div>

                    <h2 className="
                        flex
                        items-center
                        gap-2
                        text-lg md:text-2xl
                        font-bold
                        text-white
                    ">

                        {agentDetails[agent]?.icon}

                        {agentDetails[agent]?.name}

                    </h2>


                    <p className="
                        mt-1
                        text-xs md:text-sm
                        text-zinc-400
                    ">

                        {agentDetails[agent]?.description}

                    </p>


                </div>



                <ModelSelector />


            </div>





            {/* Messages */}

            <div

                ref={messagesContainerRef}

                className="
                    flex-1
                    min-h-0
                    overflow-y-auto
                    px-6
                    py-6
                "


                onScroll={(e)=>{


                    const element =
                        e.currentTarget;



                    autoScrollRef.current =

                        element.scrollHeight -
                        element.scrollTop -
                        element.clientHeight
                        < 100;


                }}

            >


                <div className="
                    mx-auto
                    flex
                    w-full
                    max-w-5xl
                    flex-col
                    gap-5
                ">



                {/* Empty State */}

                {
                    messages.length === 0 && (

                        <div className="
                            flex
                            min-h-[350px] md:min-h-[500px]
                            flex-col
                            items-center
                            justify-center
                            text-center
                        ">


                            <div className="
                                mb-5
                                text-4xl md:text-6xl
                            ">

                                {agentDetails[agent]?.icon}

                            </div>



                            <h1 className="
                                text-2xl md:text-3xl
                                font-bold
                                text-white
                            ">

                                Welcome to {agentDetails[agent]?.name}

                            </h1>



                            <p className="
                                mt-3
                                max-w-xs md:max-w-md
                                text-zinc-400
                            ">

                                {agentDetails[agent]?.description}

                            </p>




                            <div className="
                                mt-8
                                grid
                                grid-cols-1 sm:grid-cols-2
                                gap-3
                            ">


                                <button

                                    onClick={() =>
                                        useSuggestion(
                                            "Explain my code"
                                        )
                                    }

                                    className="
                                        rounded-xl
                                        border
                                        border-zinc-700
                                        bg-zinc-900
                                        px-3 md:px-4
py-2 md:py-3
                                        text-sm
                                        text-white
                                        hover:bg-zinc-800
                                    "

                                >

                                    Explain my code

                                </button>




                                <button

                                    onClick={() =>
                                        useSuggestion(
                                            "Analyze this document"
                                        )
                                    }

                                    className="
                                        rounded-xl
                                        border
                                        border-zinc-700
                                        bg-zinc-900
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        hover:bg-zinc-800
                                    "

                                >

                                    Analyze document

                                </button>




                                <button

                                    onClick={() =>
                                        useSuggestion(
                                            "Help me learn this topic"
                                        )
                                    }

                                    className="
                                        rounded-xl
                                        border
                                        border-zinc-700
                                        bg-zinc-900
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        hover:bg-zinc-800
                                    "

                                >

                                    Help me learn

                                </button>




                                <button

                                    onClick={() =>
                                        useSuggestion(
                                            "Review my work"
                                        )
                                    }

                                    className="
                                        rounded-xl
                                        border
                                        border-zinc-700
                                        bg-zinc-900
                                        px-4
                                        py-3
                                        text-sm
                                        text-white
                                        hover:bg-zinc-800
                                    "

                                >

                                    Review my work

                                </button>


                            </div>


                        </div>

                    )
                }





                {/* Chat Messages */}


                {
                    messages.map((msg,index)=>(


                        <div

                            key={index}

                            className={`
                                flex
                                ${
                                    msg.role==="user"
                                    ?
                                    "justify-end"
                                    :
                                    "justify-start"
                                }
                            `}

                        >


                            <div

                                className={`
                                   max-w-[95%] md:max-w-[85%]
                                    rounded-2xl
                                    px-4 md:px-5
py-3 md:py-4
                                    shadow-lg

                                    ${
                                        msg.role==="user"
                                        ?
                                        "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                                        :
                                        "border border-zinc-700 bg-zinc-900 text-white"
                                    }
                                `}

                            >



                            {
                                msg.role==="ai"

                                ?

                                <ReactMarkdown

                                    remarkPlugins={[
                                        remarkGfm
                                    ]}


                                    components={{

                                        code(props){

                                            const {

                                                children,
                                                className

                                            } = props;



                                            const match =
                                                /language-(\w+)/
                                                .exec(
                                                    className || ""
                                                );



                                            if(!match){

                                                return (

                                                    <code className="
                                                        rounded
                                                        bg-zinc-700
                                                        px-1
                                                        py-0.5
                                                    ">

                                                        {children}

                                                    </code>

                                                );

                                            }



                                            return (

                                                <SyntaxHighlighter

                                                    language={
                                                        match[1]
                                                    }

                                                    style={
                                                        oneDark
                                                    }


                                                    customStyle={{

                                                        borderRadius:
                                                            "12px",

                                                        marginTop:
                                                            "12px",

                                                        marginBottom:
                                                            "12px"

                                                    }}

                                                >

                                                    {
                                                        String(children)
                                                        .replace(
                                                            /\n$/,
                                                            ""
                                                        )
                                                    }


                                                </SyntaxHighlighter>

                                            );

                                        }

                                    }}

                                >

                                    {msg.content}


                                </ReactMarkdown>


                                :


                                <p className="
                                    whitespace-pre-wrap
                                ">

                                    {msg.content}

                                </p>

                            }


                            </div>


                        </div>


                    ))
                }




                {
                    loading && (

                        <div className="
                            flex
                            justify-start
                        ">


                            <div className="
                                rounded-2xl
                                border
                                border-zinc-700
                                bg-zinc-900
                                px-5
                                py-4
                            ">


                                <div className="
                                    flex
                                    gap-2
                                ">


                                    <div className="
                                        h-2
                                        w-2
                                        animate-bounce
                                        rounded-full
                                        bg-white
                                    "/>


                                    <div className="
                                        h-2
                                        w-2
                                        animate-bounce
                                        rounded-full
                                        bg-white
                                        [animation-delay:150ms]
                                    "/>


                                    <div className="
                                        h-2
                                        w-2
                                        animate-bounce
                                        rounded-full
                                        bg-white
                                        [animation-delay:300ms]
                                    "/>


                                </div>


                            </div>


                        </div>

                    )
                }





                <div ref={messagesEndRef}/>


                </div>


            </div>





            {/* Input */}

            <div className="
                shrink-0
                border-t
                border-zinc-800
                bg-zinc-950
                p-3 md:p-5
            ">


                <div className="
    mx-auto
    flex
    w-full
    max-w-5xl
    items-end
    gap-2
    md:gap-3
">


                    <textarea

                        rows={1}

                        value={message}


                        placeholder="Ask NeuroCore anything..."


                        onChange={(e)=>
                            setMessage(
                                e.target.value
                            )
                        }



                        onKeyDown={(e)=>{


                            if(
                                e.key==="Enter" &&
                                !e.shiftKey
                            ){

                                e.preventDefault();

                                sendMessage();

                            }


                        }}



                        className="
                            flex-1
min-w-0
                            resize-none
                            rounded-2xl
                            border
                            border-zinc-700
                            bg-zinc-900
                            p-3 md:p-4
                            text-white
                            outline-none
                            focus:border-cyan-500
                        "

                    />





                    <button

                        onClick={sendMessage}

                        disabled={loading}


                        className={`
    flex
    h-12
    w-12
    md:h-14
    md:w-14
    items-center
    justify-center
    rounded-2xl
    text-lg
    md:text-2xl
    font-semibold

                            ${
                                loading
                                ?
                                "cursor-not-allowed bg-zinc-700 text-zinc-500"
                                :
                                "bg-cyan-500 text-black hover:bg-cyan-400"
                            }
                        `}

                    >

                        ↑

                    </button>


                </div>


            </div>


        </div>

    );

}