'use client'

import {useRouter} from "next/navigation";

export function Logo() {

    const router = useRouter()

    return (
        <div onClick={() => router.push('/')}
            className={`border border-transparent p-2 rounded-lg hover:cursor-pointer`}>
            <label id={`logo`}
                   className={`text-3xl text-base-content hover:cursor-pointer`}>
                <span className={`font-bold`}>LUD</span><i>Nails</i>
            </label>
            <br/>
            <p className={`text-sm font-light mt-2`}>Minha prioridade é a sua autoestima.</p>
        </div>
    )
}
