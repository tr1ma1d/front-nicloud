import { Chat } from '@/store/unifinedReducer';
import Image from 'next/image'
import { FC } from 'react';

interface ItemState {
    onSelectedChat: (chat: Chat) => void;
    chat: Chat;
}

export const ItemGroup: FC<ItemState> = ({ onSelectedChat, chat }) => {
    const handleClick = () => {
        onSelectedChat(chat);
    }
    return (
        <div onClick={handleClick} className="w-16 h-16 bg-black my-1 rounded-md overflow-hidden">
            <button className="w-full h-full relative">
                <Image
                    src="/logotype-example.svg"
                    alt="logo"
                    layout="fill"
                    objectFit="cover"
                />
            </button>
        </div>
    );
}