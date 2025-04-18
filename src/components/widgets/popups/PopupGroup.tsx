import { ButtonClose } from "@/components/buttons/ButtonCLose";
import { FC } from "react";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PopupGroup: FC<PopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed top-1/2 left-1/2 z-20 w-96 h-96 bg-black transform -translate-x-1/2 -translate-y-1/2">
            <ButtonClose onClose={onClose} />
            <form action="">{/* Форма */}</form>
        </div>
    );
}