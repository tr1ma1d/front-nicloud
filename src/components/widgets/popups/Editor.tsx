import { ButtonClose } from "@/components/buttons/ButtonCLose";
import { motion } from "framer-motion";
import { FC } from "react";
import { WallpaperList } from "../lists/WallpaperList";

interface EditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Editor: FC<EditorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 10 }}
      transition={{ duration: 0.3}}
      >
      <div className="fixed right-[10px] bg-blue-500 bottom-[0px] w-[400px] h-[600px] flex items-center z-20 flex-col">
        <div className="flex justify-between w-[100%]">
          <div></div>
          <ButtonClose onClose={onClose}/>
        </div>
        <WallpaperList/>
      </div>
    </motion.div>
  );
};