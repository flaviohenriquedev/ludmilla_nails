import { __input_style } from './style'
import { InputProps } from "@/interfaces/root-interfaces";

export function InputDate(props: InputProps) {

    return (
        <__input_style
            {...props}
            type="date"
            disabled-dates="2024-09-01, 2024-09-02, 2024-09-03"
        />
    );
}
