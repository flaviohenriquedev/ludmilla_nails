import {__input_style} from './style'
import {InputProps} from "@/interfaces/root-interfaces";

export function InputText({}: InputProps) {
    return (
        <__input_style
            type={`text`}/>
    )
}
