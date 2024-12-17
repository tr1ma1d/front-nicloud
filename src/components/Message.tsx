import Image from 'next/image';
import './styles/message-style.scss';
type MessageProps = {
    senderId: string;
    content: string;
};

export default function Message({ senderId, content }: MessageProps) {
    return (
        <div className="msg">
            <div className="message_logo">
                <Image src="/logotype-example.svg" alt="logo" layout="fill" objectFit="cover" />
            </div>
            <div className="message-container">
                <span className="message__nickname">{senderId}</span>
                <p className="message__text">{content}</p>
            </div>
        </div>
    );
}
