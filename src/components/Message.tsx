import Image from 'next/image';
import './styles/message-style.scss';
import { useContext, useEffect } from 'react';
import { CustomThemeContext } from '@/hooks/useCustomThemeContext';
type MessageProps = {
    username: string;
    content: string;
};

export default function Message({ username, content }: MessageProps) {
   const context = useContext(CustomThemeContext);
    if (!context) {
        throw new Error('ThemeToggle must be used within a CustomThemeProvider');
    }
    const { theme } = context;
    
    return (
        <div className="flex m-2.5">
            <div className="message_logo">
                <Image src="/logotype-example.svg" alt="logo" fill objectFit="cover" />
            </div>
            <div className={`${theme.title === 'light' ? 'bg-[#E6E6E6] text-[#353535]' : "bg-gray-800 text-white"} mx-5 rounded-r-xl p-5 pt-2.5`}>
                <span className="message__nickname">{username}</span>
                <p className="message__text">{content}</p>
            </div>
        </div>
    );
}
