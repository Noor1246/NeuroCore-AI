"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function AuthGuard({
    children
}:{
    children: React.ReactNode
}){


    const router = useRouter();

    const [checking,setChecking] = useState(true);



    useEffect(()=>{


        const token = localStorage.getItem("token");


        if(!token){

            router.push("/login");

        }
        else{

            setChecking(false);

        }


    },[router]);



    if(checking){

        return (

            <div className="
                min-h-screen
                bg-black
                text-white
                flex
                items-center
                justify-center
            ">

                Checking authentication...

            </div>

        );

    }



    return children;


}