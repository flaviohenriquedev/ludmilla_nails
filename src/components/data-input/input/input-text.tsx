import {__input_style} from './style'
import {InputProps} from "@/interfaces/root-interfaces";

export function InputText({id, name, list}: InputProps) {
    return (
        <__input_style
            id={id}
            name={name}
            list={list}
            type={`text`}/>
    )
}
