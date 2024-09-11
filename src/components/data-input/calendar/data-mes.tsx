interface Props {
    day: number
    disabled?: boolean
    onClick?: () => void
    highlight?: boolean
}

export function DataMes({
                            day,
                            disabled = false,
                            onClick,
                            highlight = false
                        }: Props) {

    const indexKey = Math.random().toString(5)

    const classDisabled = `
                bg-base-200
                hover:not-allowed
                text-base-content/40
    `
    const classEnabled = `
                        hover:cursor-pointer
                        hover:border
                        hover:border-primary
    `
    return (
        <div key={`${indexKey}-${day}`}
             onClick={!disabled ? onClick : () => {
             }}
             className={`
                border
                relative
                px-3
                py-2 ${highlight ? 'border-secondary' : 'border-base-200'}
                ${disabled ? classDisabled : classEnabled}`}>
            <time>{day}</time>
        </div>
    )
}
