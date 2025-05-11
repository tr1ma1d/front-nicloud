import { KeyboardEvent, useContext, useState } from 'react';
import Image from 'next/image';
import { CustomThemeContext } from '@/hooks/useCustomThemeContext';

type MessageInputProps = {
    onSendMessage: (message: string) => void;
};

export default function MessageInput({ onSendMessage }: MessageInputProps) {
    const [messageInput, setMessageInput] = useState('');
    const context = useContext(CustomThemeContext);
    if (!context) {
        throw new Error('ThemeToggle must be used within a CustomThemeProvider');
    }
    const { theme } = context;

    const handleSendKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    }

    const handleSubmit = () => {
        if (messageInput.trim()) {
            onSendMessage(messageInput);
            setMessageInput('');
        }
    };

    return (
        <div className="w-full h-12 relative overflow-hidden">
            <input
                className={`placeholder-gray-400 w-full h-full duration-700 ${theme.title === 'light' ? 'bg-[#ffffffda] text-black' : 'bg-gray-900 text-white'} focus:outline-none rounded-[50px] px-5 relative backdrop-blur-sm`}
                type="text"
                placeholder="Type..."
                value={messageInput}
                onKeyDown={handleSendKeyDown}
                onChange={(e) => setMessageInput(e.target.value)}
            />
            <div className="absolute right-1 top-0 bottom-0 flex items-center gap-1.5">
                <button onClick={handleSubmit} className='bg-[#BBBBBB] relative w-10 h-10 rounded-[50%] duration-150 hover:bg-[#747474] hover:scale-110'>
                    <Image src="/arrow-right.svg" alt="Send" layout="fill" objectFit="none" />
                </button>
            </div>

        </div>
    );
}
