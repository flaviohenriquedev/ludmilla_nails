interface Props {
    day: number
    disabled?: boolean
    onClick?: () => void
}

export function DataMes({day, disabled = false, onClick}: Props) {
    const indexKey = Math.random().toString(5)

    const classDisabled = `
    bg-base-200
    hover:not-allowed
    `
    const classEnabled = `
                        border
                        border-base-200
                        relative
                        px-3
                        py-2
                        hover:cursor-pointer
                        hover:border
                        hover:border-primary
    `
    return (
        <div key={`${indexKey}-${day}`}
             onClick={onClick}
             className={`${disabled ? classDisabled : classEnabled}`}>
            <time>{day}</time>
        </div>
    )
}
