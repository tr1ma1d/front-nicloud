import { FC } from "react";

interface EditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Editor: FC<EditorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      <div className="w-[200px] h-[200px] bg-blue-600 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          close
        </button>
      </div>
    </div>
  );
};