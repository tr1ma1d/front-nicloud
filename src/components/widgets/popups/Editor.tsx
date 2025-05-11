import { ButtonClose } from "@/components/buttons/ButtonCLose";
import { motion } from "framer-motion";
import { FC, useContext } from "react";
import { WallpaperList } from "../lists/WallpaperList";
import { ThemeToggle } from "@/components/buttons/ThemeToggle";
import { CustomThemeContext } from "@/hooks/useCustomThemeContext";

interface EditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Editor: FC<EditorProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error('ThemeToggle must be used within a CustomThemeProvider');
  }
  const { theme } = context;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`fixed right-[10px] duration-300 ${theme.title === 'light' ? "bg-white/30" : "bg-gray-700/30"} backdrop-blur-sm bottom-[0px] w-[400px] h-[600px] flex items-center z-20 flex-col rounded-lg`}>
        <div className="flex justify-between w-[100%]">
          <div></div>
          <ButtonClose onClose={onClose} />
        </div>
        <ThemeToggle />
        <WallpaperList />
      </div>
    </motion.div>
  );
};