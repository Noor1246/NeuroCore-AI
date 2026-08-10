"use client";

import { useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage(){

    const router = useRouter();


    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");



    async function handleRegister() {

    try {

        setLoading(true);
        setError("");

        // Register user
        await api.post(
            "/auth/register",
            {
                name,
                email,
                password
            }
        );

        // Login immediately
        const response = await api.post(
            "/auth/login",
            {
                email,
                password
            }
        );

        // Save JWT
        localStorage.setItem(
            "token",
            response.data.access_token
        );

        toast.success("Welcome to NeuroCore AI!");

        setTimeout(() => {
            router.push("/");
        }, 700);

    }
    catch (error) {

        console.log(error);

        setError(
            "Registration failed. Email may already exist."
        );

        toast.error(
            "Registration failed. Email may already exist."
        );

    }
    finally {

        setLoading(false);

    }

}



    return(

        <div className="
            min-h-screen
            bg-black
            text-white
            flex
            items-center
            justify-center
            px-6
        ">


            <div className="w-full max-w-md">



                {/* Logo */}

                <div className="mb-8 text-center">


                    <div className="
                        mx-auto
                        mb-4
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-cyan-500
                    ">

                        <span className="text-2xl">
                            🤖
                        </span>

                    </div>



                    <h1 className="text-3xl font-bold">
                        NeuroCore AI
                    </h1>


                    <p className="mt-2 text-sm text-zinc-500">
                        Enterprise AI Workspace
                    </p>


                </div>





                {/* Card */}

                <div className="
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-8
                    backdrop-blur-xl
                ">


                    <h2 className="text-2xl font-semibold">
                        Create Account
                    </h2>


                    <p className="mt-2 text-sm text-zinc-400">
                        Join NeuroCore and build with intelligent AI agents.
                    </p>




                    <div className="mt-6 space-y-4">



                        <input
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-black/40
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-cyan-400
                            "
                            placeholder="Full Name"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />



                        <input
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-black/40
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-cyan-400
                            "
                            placeholder="Email"
                            value={email}
                            type="email"
                            onChange={(e)=>setEmail(e.target.value)}
                        />



                        <input
                            className="
                                w-full
                                rounded-xl
                                border
                                border-white/10
                                bg-black/40
                                px-4
                                py-3
                                outline-none
                                transition
                                focus:border-cyan-400
                            "
                            placeholder="Password"
                            type="password"
                            value={password}
                            minLength={8}
                            onChange={(e)=>setPassword(e.target.value)}
                        />



                        {
                            error && (

                                <p className="text-sm text-red-400">
                                    {error}
                                </p>

                            )
                        }



                        <button
                            onClick={handleRegister}
                            disabled={loading}
                            className="
                                w-full
                                rounded-xl
                                bg-cyan-500
                                py-3
                                font-semibold
                                text-black
                                transition
                                hover:bg-cyan-400
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            {
                                loading
                                ?
                                "Creating account..."
                                :
                                "Create Account →"
                            }


                        </button>



                    </div>





                    <p className="
                        mt-6
                        text-center
                        text-sm
                        text-zinc-500
                    ">


                        Already have an account?{" "}


                        <Link
                            href="/login"
                            className="
                                text-cyan-400
                                hover:text-cyan-300
                            "
                        >
                            Sign in
                        </Link>


                    </p>



                </div>



            </div>


        </div>

    );

}