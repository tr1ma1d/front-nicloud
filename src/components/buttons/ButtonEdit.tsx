import Image from 'next/image';
import { Editor } from '../widgets/popups/Editor';
import { useContext, useState } from 'react';
import { CustomThemeContext } from '@/hooks/useCustomThemeContext';
const ButtonEdit = () => {
    const [isOpenEditor, setIsOpenEditor] = useState(false);

    const openEditor = () => {
        setIsOpenEditor(true);
    }
    const closeEditor = () => {
        setIsOpenEditor(false);
    }
    const context = useContext(CustomThemeContext);
    if (!context) {
        throw new Error('ThemeToggle must be used within a CustomThemeProvider');
    }
    const { theme } = context;
    return (
        <div className="absolute right-5 bottom-10 z-10">
            <button onClick={openEditor} className={`w-12 h-12 duration-300 rounded-full flex ${theme.title === 'light' ? "bg-white hover:bg-sky-100" : "bg-gray-800 hover:bg-gray-500"} justify-center align-center hover:bg-sky-100 transition-colors`}>
                <Image
                    src="/pen-solid.svg"
                    alt="Edit icon"
                    width={20}
                    height={20}
                />
            </button>
            <Editor isOpen={isOpenEditor} onClose={closeEditor} />
        </div>
    );
}

export default ButtonEdit;