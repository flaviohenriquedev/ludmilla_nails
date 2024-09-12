const servicos = [
    {
        descricao: 'Esmaltação em Gel',
        valor: 1
    },
    {
        descricao: 'Esmaltação Simples',
        valor: 2
    },
]

export function Select() {
    return (
        <select className="select select-sm rounded-sm select-bordered w-full max-w-xs">
            <option disabled selected>Qual serviço deseja?</option>
            {servicos && (
                servicos.map((servico) => (
                    <option key={servico.valor} value={servico.valor}>{servico.descricao}</option>
                ))
            )}
        </select>
    )
}
