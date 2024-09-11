import {ChildrenProps} from "@/interfaces/root-interfaces";

export function Container({children}: ChildrenProps) {
    return (
        <div className={`flex w-full h-full flex-col gap-5 px-80 py-10`}>
            {children}
        </div>
    )
}
