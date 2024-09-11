'use client'

import {icons} from "@/constants/icons/icons";
import {DataMes} from "@/components/data-input/calendar/data-mes";
import {Modal} from "@/components/data-display/modal/modal";
import {openModal} from "@/functions/utils";
import {Label} from "@/components/data-input/label/label";
import {InputText} from "@/components/data-input/input/input-text";
import {useEffect, useState} from "react";

const diasSemana: { descricao: string }[] = [
    {descricao: 'Domingo'},
    {descricao: 'Segunda'},
    {descricao: 'Terça'},
    {descricao: 'Quarta'},
    {descricao: 'Quinta'},
    {descricao: 'Sexta'},
    {descricao: 'Sábado'}
];

export function Calendar() {

    const [actualDay, setActualDay] = useState<Date>(new Date);

    useEffect(() => {
        setActualDay(new Date());
    }, [])

    const getDaysInCurrentMonth = (): number[] => {
        const year = actualDay.getFullYear();
        const month = actualDay.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return Array.from({length: daysInMonth}, (_, i) => i + 1);
    };

    const getFirstDayOfMonth = (): number => {
        const year = actualDay.getFullYear();
        const month = actualDay.getMonth();
        return new Date(year, month, 1).getDay(); // Retorna o índice do dia da semana (0-6)
    };

    const getDaysFromPreviousMonth = (firstDayIndex: number): number[] => {
        const year = actualDay.getFullYear();
        const month = actualDay.getMonth();
        const daysInPreviousMonth = new Date(year, month, 0).getDate();
        return Array.from(
            {length: firstDayIndex},
            (_, i) => daysInPreviousMonth - firstDayIndex + i + 1
        );
    };

    function renderDiasSemana() {
        return diasSemana.map(dia => (
            <div key={dia.descricao} className="flex justify-center py-2">
                <span>{dia.descricao}</span>
            </div>
        ));
    }

    function renderDias() {
        const daysInCurrentMonth = getDaysInCurrentMonth();
        const firstDayIndex = getFirstDayOfMonth(); // Índice do primeiro dia do mês
        const daysFromPreviousMonth = getDaysFromPreviousMonth(firstDayIndex);

        return [
            ...daysFromPreviousMonth.map(day => (
                <DataMes
                    day={day}
                    disabled={true}/>
            )),
            ...daysInCurrentMonth.map(day => (
                <DataMes
                    highlight={day === actualDay.getDate()}
                    disabled={day < actualDay.getDate()}
                    day={day}
                    onClick={() => openModal(`modalData`)}/>
            ))
        ];
    }

    return (
        <>
            <div className="lg:flex lg:h-full lg:flex-col">
                <header
                    className="flex items-center justify-between border-b border-primary px-6 py-4 lg:flex-none bg-base-300 text-base-content">
                    <h1 className="font-semibold leading-6">
                        <time dateTime="2022-01">Setembro de 2024</time>
                    </h1>
                    <div className="flex items-center">
                        <div className="relative flex items-center rounded-md shadow-sm md:items-stretch">
                            <div
                                className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l pr-1 focus:relative md:w-9 md:pr-0">
                                {icons["seta-esquerda"]}
                            </div>
                            <button
                                type="button"
                                className="hidden border-y px-3.5 text-sm font-semibold focus:relative md:block"
                            >
                                Hoje
                            </button>
                            <span className="relative -mx-px h-5 w-px md:hidden"></span>
                            <div
                                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r pl-1 focus:relative md:w-9 md:pl-0">
                                {icons["seta-direita"]}
                            </div>
                        </div>
                    </div>
                </header>
                <div className={`
                lg:flex
                lg:flex-auto
                lg:flex-col
            `}>
                    <div className={`
                    grid
                    grid-cols-7
                    gap-px
                    border-b
                    border-primary
                    text-center
                    text-xs
                    font-semibold
                    leading-6
                    lg:flex-none
                `}>
                        {renderDiasSemana()}
                    </div>
                    <div className="flex text-xs leading-6 lg:flex-auto">
                        <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
                            {renderDias()}
                        </div>
                    </div>
                </div>
            </div>

            <Modal idModal={`modalData`}>
                <form className={`flex flex-col gap-10`}>

                    <Label label={`Nome Completo`}>
                        <InputText/>
                    </Label>

                    <Label label={`Telefone`}>
                        <InputText/>
                    </Label>

                    <button className={`btn btn-primary btn-sm w-auto`}>Agendar</button>
                </form>
            </Modal>
        </>
    );
}
