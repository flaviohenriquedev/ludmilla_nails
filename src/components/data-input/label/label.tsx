import {ChildrenProps} from "@/interfaces/root-interfaces";

interface Props extends ChildrenProps {
    label: string
}

export function Label({children, label}: Props) {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">{label}</span>
            </div>
            {children}
        </label>
    )
}
