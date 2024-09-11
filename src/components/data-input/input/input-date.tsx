import { __input_style } from './style'
import { InputProps } from "@/interfaces/root-interfaces";
import { useState } from 'react';

const datasOcupadas: { data: string }[] = [
    { data: '2024-09-01' },
    { data: '2024-09-02' },
    { data: '2024-09-03' }
];

export function InputDate({}: InputProps) {

    return (
        <__input_style
            type="date"
            disabled-dates="2024-09-01, 2024-09-02, 2024-09-03"
        />
    );
}
