import {ImgHTMLAttributes} from "react";

interface CardProps extends ImgHTMLAttributes<HTMLImageElement> {
    titulo: string;
    texto: string;
}

export function Card({src, alt, titulo, texto}: CardProps) {
    return (
        <div className="card lg:card-side bg-base-100 shadow-xl">
            <figure className={`w-96 h-96 overflow-hidden`}>
                <img
                    src={src}
                    alt={alt}/>
            </figure>
            <div className="card-body">
                <h2 className="card-title">{titulo}</h2>
                <p>{texto}</p>
            </div>
        </div>
    )
}
