import Image from 'next/image';
import "./styles/chat-header.scss";
import { CustomThemeContext } from '@/hooks/useCustomThemeContext';
import { useContext } from 'react';
type ChatHeaderProps = {
    selectedFriend: string | null;
};

export default function ChatHeader({ selectedFriend }: ChatHeaderProps) {
    const context = useContext(CustomThemeContext);
    if (!context) {
        throw new Error('ThemeToggle must be used within a CustomThemeProvider');
    }
    const { theme } = context;
    return (
        <div className={`w-full flex justify-center items-center 
        ${theme.title === 'light' ? 'bg-white text-[#494949]' : 'bg-gray-700 text-white'}
        duration-700 font-bold gap-2.5 overflow-hidden min-h-16`}
        >
            <div className="px-2.5">
                <span>
                    {selectedFriend || 'Select a friend'}
                </span>
            </div>
        </div>
    );
}
