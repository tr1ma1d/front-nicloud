import Image from 'next/image';
import './styles/message-style.scss';
import { useEffect } from 'react';
type MessageProps = {
    username: string;
    content: string;
};

export default function Message({ username, content }: MessageProps) {
   
    
    return (
        <div className="msg">
            <div className="message_logo">
                <Image src="/logotype-example.svg" alt="logo" layout="fill" objectFit="cover" />
            </div>
            <div className="message-container">
                <span className="message__nickname">{username}</span>
                <p className="message__text">{content}</p>
            </div>
        </div>
    );
}
