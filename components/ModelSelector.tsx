"use client";

import { useEffect, useState } from "react";

export default function ModelSelector() {

    const [models, setModels] = useState<string[]>([]);
    const [current, setCurrent] = useState("");

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/models/`)
            .then(res => res.json())
            .then(data => {

                setModels(data.models);
                setCurrent(data.current);

            });

    }, []);

    async function changeModel(model: string) {

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/models/${model}`,
            {
                method: "POST"
            }
        );

        setCurrent(model);

    }

    return (

        <select

            value={current}

            onChange={(e)=>changeModel(e.target.value)}

            className="rounded-lg bg-zinc-900 border border-zinc-700 p-2 text-white"

        >

            {

                models?.map(model=>(

                    <option
                        key={model}
                        value={model}
                    >

                        {model}

                    </option>

                ))

            }

        </select>

    );

}