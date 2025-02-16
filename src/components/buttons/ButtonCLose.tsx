import { FC } from "react";

interface IButtonProps{
    onClose: () => void;
}
export const ButtonClose: FC<IButtonProps> = ({onClose}) => {
    return (
        <div>
            <button onClick={onClose} className="top-2 right-2">
                close
            </button>
        </div>
    );
}