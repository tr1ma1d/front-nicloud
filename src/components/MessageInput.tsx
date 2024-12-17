import { useState } from 'react';
import Image from 'next/image';

type MessageInputProps = {
    onSendMessage: (message: string) => void;
};

export default function MessageInput({ onSendMessage }: MessageInputProps) {
    const [messageInput, setMessageInput] = useState('');

    const handleSubmit = () => {
        if (messageInput.trim()) {
            onSendMessage(messageInput);
            setMessageInput('');
        }
    };

    return (
        <div className="input-message">
            <input
                type="text"
                placeholder="Type..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
            />
            <div className = "send-message__container">
                <button onClick={handleSubmit}>
                    <Image src="/arrow-right.svg" alt="Send" layout="fill" objectFit="none" />
                </button>
            </div>

        </div>
    );
}
