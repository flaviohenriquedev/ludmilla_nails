import {ChildrenProps} from "@/interfaces/root-interfaces";

interface Props extends ChildrenProps {
    idModal: string
}

export function Modal({idModal, children}: Props) {
    return (
        <dialog id={idModal}
                className="modal">
            <div className="modal-box">
                {children}
            </div>
        </dialog>
    )
}
