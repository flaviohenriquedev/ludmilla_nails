'use client'

import {icons} from "@/constants/icons/icons";
import {DataMes} from "@/components/data-input/calendar/data-mes";
import {Modal} from "@/components/data-display/modal/modal";
import {openModal} from "@/functions/utils";
import {Label} from "@/components/data-input/label/label";
import {InputText} from "@/components/data-input/input/input-text";
import {useEffect, useState} from "react";
import {LineContent} from "@/components/data-input/line-content/line-content";
import {Select} from "@/components/data-input/select/select";

const diasSemana: { descricao: string }[] = [
    {descricao: 'Domingo'},
    {descricao: 'Segunda'},
    {descricao: 'Terça'},
    {descricao: 'Quarta'},
    {descricao: 'Quinta'},
    {descricao: 'Sexta'},
    {descricao: 'Sábado'}
];

const monthDescription = [
    {descricao: 'Janeiro'},
    {descricao: 'Fevereiro'},
    {descricao: 'Março'},
    {descricao: 'Abril'},
    {descricao: 'Maio'},
    {descricao: 'Junho'},
    {descricao: 'Julho'},
    {descricao: 'Agosto'},
    {descricao: 'Setembro'},
    {descricao: 'Outubro'},
    {descricao: 'Novembro'},
    {descricao: 'Dezembro'},
]

enum Operator {
    SUM = "SUM",
    SUB = "SUB"
}

export function Calendar() {

    const [dataCorrente, setDataCorrente] = useState<Date>(new Date());
    const [dateSelected, setDateSelected] = useState<Date>()

    useEffect(() => {
        setDataCorrente(new Date());
    }, [])

    function getDatasDoMesCorrente() {
        const datasDoMes: Date[] = [];
        const primeiroDia = new Date(dataCorrente.getFullYear(), dataCorrente.getMonth(), 1).getDate();
        const ultimoDia = new Date(dataCorrente.getFullYear(), dataCorrente.getMonth() + 1, 0).getDate();

        for (let i: number = primeiroDia; i <= ultimoDia; i++) {
            datasDoMes.push(new Date(dataCorrente.getFullYear(), dataCorrente.getMonth(), i))
        }
        return datasDoMes;
    }

    function onClickDataMes(date: Date) {
        setDateSelected(date);
        openModal(`modalData`);
    }

    function renderDias() {
        const datasDoMesCorrente = getDatasDoMesCorrente();
        const indexPrimeiroDiaDaSemana = getDiaDaSemanaDoPrimeiroDiaDoMesCorrente();
        const datasDoMesAnterior = getDatasDoMesAnterior(indexPrimeiroDiaDaSemana);

        return [
            ...datasDoMesAnterior.map(data => (
                <DataMes
                    key={`previous-${data.toISOString()}`}
                    data={data}
                    monthDescription={monthDescription[data.getMonth()].descricao}
                    onClick={() => onClickDataMes(data)}/>
            )),
            ...datasDoMesCorrente.map(data => (
                <DataMes
                    key={`current-${data.toISOString()}`}
                    data={data}
                    onClick={() => onClickDataMes(data)}/>
            ))
        ];
    }

    const alterActualDate = (month?: number, operator?: Operator) => {
        const monthToOperation = month ?? 0;

        switch (operator) {
            case Operator.SUM:
                setDataCorrente(prevState => new Date(prevState.getFullYear(), prevState.getMonth() + monthToOperation, 1));
                break;
            case Operator.SUB:
                setDataCorrente(prevState => new Date(prevState.getFullYear(), prevState.getMonth() - monthToOperation, 1));
                break;
            default:
                setDataCorrente(new Date());
                break;
        }
    }

    const getDiaDaSemanaDoPrimeiroDiaDoMesCorrente = (): number => {
        const year = dataCorrente.getFullYear();
        const month = dataCorrente.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const getDatasDoMesAnterior = (indexPrimeiroDiaDaSemana: number): Date[] => {
        const datas: Date[] = [];
        const year = dataCorrente.getFullYear();
        const month = dataCorrente.getMonth();
        const ultimoDiaDoMesAnterior = new Date(year, month, 0).getDate();

        for (let i: number = (ultimoDiaDoMesAnterior - indexPrimeiroDiaDaSemana) + 1; i <= ultimoDiaDoMesAnterior; i++) {
            datas.push(new Date(year, month - 1, i))
        }

        return datas;
    };

    function renderDiasSemana() {
        return diasSemana.map(dia => (
            <div key={dia.descricao} className="flex justify-center py-2">
                <span>{dia.descricao}</span>
            </div>
        ));
    }

    return (
        <>
            <div className="lg:flex lg:h-full lg:flex-col">
                <header
                    className="flex items-center justify-between border-b border-primary px-6 py-4 lg:flex-none bg-base-300 text-base-content">
                    <h1 className="font-semibold leading-6">
                        <time dateTime="2022-01">{
                            monthDescription[dataCorrente.getMonth()].descricao + ' de ' + dataCorrente.getFullYear().toString()
                        }</time>
                    </h1>
                    <div className="flex items-center">
                        <div className="relative flex items-center rounded-md shadow-sm md:items-stretch">
                            <div
                                className={`flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l pr-1 focus:relative md:w-9 md:pr-0 hover:cursor-pointer`}
                                onClick={() => alterActualDate(1, Operator.SUB)}>
                                {icons["seta-esquerda"]}
                            </div>
                            <button
                                type={`button`}
                                className={`hidden border-y px-3.5 text-sm font-semibold focus:relative md:block`}
                                onClick={() => alterActualDate()}
                            >
                                Hoje
                            </button>
                            <span className="relative -mx-px h-5 w-px md:hidden"></span>
                            <div
                                className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r pl-1 focus:relative md:w-9 md:pl-0 hover:cursor-pointer"
                                onClick={() => alterActualDate(1, Operator.SUM)}>
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

                {dateSelected && (
                    <div className={`flex gap-4 items-center mb-10`}>
                        Data: {dateSelected.toLocaleDateString()}
                    </div>
                )}

                <form className={`flex flex-col gap-10`}>
                    <LineContent>
                        <Label label={`Nome Completo`}>
                            <InputText/>
                        </Label>

                        <Label label={`Telefone`}>
                            <InputText/>
                        </Label>
                    </LineContent>
                    <LineContent>
                        <Label label={`Selecione o Serviço`}>
                            <Select/>
                        </Label>
                    </LineContent>
                    <button className={`btn btn-primary btn-sm w-auto`}>Agendar</button>
                </form>
            </Modal>
        </>
    );
}
