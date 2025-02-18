'use client';
import './style-main.scss';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import FriendList from '@/components/FriendList';
import ChatHeader from '@/components/ChatHeader';
import MessageInput from '@/components/MessageInput';
import { useFetchFriendsQuery } from '@/store/friendListApi';

import { useChat } from '@/hooks/useChatHook';

import ButtonEdit from '@/components/buttons/ButtonEdit';
import MessageContainer from '@/components/widgets/MessageContainer';

import { useWallpaperHook } from '@/hooks/useWallpaperHook';


export default function Home() {
    const user = useSelector((state: RootState) => state.user);
    const { chatHistory, selectedFriend, handleSendMessage, handleFriendSelection, msgContainer } = useChat(user);
    const { data: friends } = useFetchFriendsQuery(user.id, {
        pollingInterval: 1000, // Запрос каждые 5 секунд
    });
    const {bgWrapper, setBgWrapper} = useWallpaperHook();

   
    return (
        <div className="main-page" style={{ 
            backgroundImage: `url(${bgWrapper})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            {
                <FriendList onSelectFriend={handleFriendSelection} friendList={friends} />
            }
            <main className="message-block">
                <div className="message-history">
                    <ChatHeader selectedFriend={selectedFriend} />
                    <MessageContainer msgContainer={msgContainer} chatHistory={chatHistory} />
                </div>
                <MessageInput onSendMessage={handleSendMessage} />
            </main>
            <ButtonEdit />
        </div>
    );
}