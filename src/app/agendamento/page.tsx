import {Container} from "@/components/layout/container/container";
import {InputText} from "@/components/data-input/input/input-text";
import {Label} from "@/components/data-input/label/label";
import {InputDate} from "@/components/data-input/input/input-date";
import {Calendar} from "@/components/data-input/calendar/calendar";

export default function PaginaAgendamento() {
    return (
        <Container>
            <Calendar />
        </Container>
    )
}
