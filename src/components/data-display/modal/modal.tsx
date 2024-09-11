import {ChildrenProps} from "@/interfaces/root-interfaces";
import {icons} from "@/constants/icons/icons";
import {closeModal} from "@/functions/utils";

interface Props extends ChildrenProps {
    idModal: string
}

export function Modal({idModal, children}: Props) {
    return (
        <dialog id={idModal}
                className="modal">
            <div className="flex flex-col modal-box">
                <div
                    className={`flex w-full items-center justify-end hover:cursor-pointer`}
                    onClick={() => closeModal(idModal)}>
                    {icons["fechar"]}
                </div>
                {children}
            </div>
        </dialog>
    )
}
