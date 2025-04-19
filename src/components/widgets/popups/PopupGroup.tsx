import { ButtonClose } from "@/components/buttons/ButtonCLose";
import { FC } from "react";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PopupGroup: FC<PopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="w-full h-full bg-black/75 backdrop-blur-md z-50 absolute">
            <div className="fixed top-1/2 left-1/2 z-20 w-[900px] h-[500px] bg-slate-50/20 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-full flex justify-end"><ButtonClose onClose={onClose} /></div>
                <form action="">
                    
                </form>
            </div>
        </div>
    );
}