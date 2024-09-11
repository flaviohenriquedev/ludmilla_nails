import {Models} from "@/data/models";

interface Props {
    model: Models
}

export function CardModels({model}: Props) {
    return (
        <div className={`grid grid-cols-[auto,1fr] gap-4`}>
            <div
                className={`flex w-full items-center gap-10 min-w-[10rem] max-w-[10rem] min-h-[10rem] max-h-[10rem]`}>
                <img
                    className="w-full h-full object-cover rounded-md"
                    src={model.urlImage}
                    alt={model.title}/>
            </div>
            <div className={`flex flex-col w-full`}>
                <h1 className={`font-bold text-xl`}>{model.title}</h1>
                <br/>
                <p className={`font-light text-sm`}>{model.description}</p>
            </div>
        </div>
    )
}
