import {ChildrenProps} from "@/interfaces/root-interfaces";

export function LineContent({children}: ChildrenProps) {
    return (
        <div className={`flex gap-4 items-center`}>
            {children}
        </div>
    )
}
