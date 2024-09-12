import {useEffect, useState} from "react";

interface Props {
    data: Date
    onClick?: () => void
    monthDescription?: string
}

export function DataMes({
                            data,
                            onClick,
                            monthDescription
                        }: Props) {
    const [indexKey, setIndexKey] = useState<string>("")
    const [classDisabled, setClassDisabled] = useState<string>("")
    const [classEnabled, setClassEnabled] = useState<string>("")
    const [isDisabled, setIsDisabled] = useState<boolean>(false)
    const [isHighLight, setIsHighLight] = useState<boolean>(false)

    useEffect(() => {
        const actualDate = new Date();
        setIsDisabled(!(new Date(data.toDateString()) >= new Date(actualDate.toDateString())))
        setIsHighLight(data.toDateString() === actualDate.toDateString());
    }, [data])

    useEffect(() => {
        setIndexKey(Math.random().toString(5))
    }, [])

    useEffect(() => {
        setClassDisabled(`bg-base-200 hover:not-allowed text-base-content/40`);
        setClassEnabled(`hover:cursor-pointer hover:border hover:border-primary`)
    }, [data])

    return (
        <div key={`${indexKey}-${data.getDate()}`}
             onClick={!isDisabled ? onClick : () => {
             }}
             className={`
                            border
                            relative
                            px-3
                            py-2
                            border-base-200 
                            ${isDisabled ? classDisabled : classEnabled}
                            ${isHighLight ? 'border-secondary' : ''}
                        `}>
            <div className={`flex items-center gap-4`}>
                <span
                    className={`flex items-center justify-center rounded-full w-6 h-6 p-2`}>
                    {data.getDate()}
                </span>
                <span>{monthDescription}</span>
            </div>
        </div>
    )
}
