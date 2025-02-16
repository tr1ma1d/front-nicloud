import { ButtonClose } from "@/components/buttons/ButtonCLose";
import { motion } from "framer-motion";
import { FC } from "react";

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
      transition={{ duration: 0.5 }}
      >
      <div className="fixed right-[10px] bottom-[0px] flex items-center justify-center z-20">
        <div className="w-[400px] h-[600px] bg-blue-600 relative">
          <div></div>
          <ButtonClose onClose={onClose}/>
        </div>
        
      </div>
    </motion.div>
  );
};