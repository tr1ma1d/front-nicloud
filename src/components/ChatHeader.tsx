import Image from 'next/image';
import "./styles/chat-header.scss";
type ChatHeaderProps = {
    selectedFriend: string | null;
};

export default function ChatHeader({ selectedFriend }: ChatHeaderProps) {
    return (
        <div className="message-header">
            <div className="header-username">
                <div className="logo-friend">
                    <Image src="/logotype-example.svg" alt="logo" layout="fill" objectFit="cover" />
                </div>
                <div className="header-username">
                    <span className="header-username__text">
                        {selectedFriend || 'Select a friend'}
                    </span>
                </div>
            </div>
            <div className="header-button_action">
                <button className="call">
                    <Image src="/phone.svg" alt="phone" layout="fill" objectFit="contain" />
                </button>
                <button className="option">
                    <Image src="/dot.svg" alt="option" layout="fill" />
                </button>
            </div>
        </div>
    );
}
