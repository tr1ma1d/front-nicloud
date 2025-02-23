import { FC } from "react";

interface IButtonProps{
    onClose: () => void;
}
export const ButtonClose: FC<IButtonProps> = ({onClose}) => {
    return (
        <div>
            <button onClick={onClose} className="top-2 right-4 px-4 py-2">
                X
            </button>
        </div>
    );
}