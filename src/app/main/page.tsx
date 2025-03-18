'use client';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import FriendList from '@/components/FriendList';
import ChatHeader from '@/components/ChatHeader';
import MessageInput from '@/components/MessageInput';
import { useFetchFriendsQuery } from '@/store/friendListApi';

import { useChat } from '@/hooks/useChatHook';

import ButtonEdit from '@/components/buttons/ButtonEdit';
import MessageContainer from '@/components/widgets/MessageContainer';

import { useContext } from 'react';
import { WallpaperContext } from '@/hooks/useWallpaperContext';
import { ListGroup } from '@/components/widgets/groups/ListGroup';


export default function Home() {
    const user = useSelector((state: RootState) => state.user);
    const { chatHistory, selectedFriend, handleSendMessage, handleFriendSelection, msgContainer } = useChat(user);
    const { data: friends } = useFetchFriendsQuery(user.id, {
        pollingInterval: 1000, // Запрос каждые 5 секунд
    });

    const context = useContext(WallpaperContext);

    if (!context) {
        throw new Error('WallpaperContext must be used within a WallpaperProvider');
    }

    const { wallpaper } = context;

    return (
        <div className="main-page" style={{
            backgroundImage: `url(${wallpaper.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 2s ease-in-out'
        }}>
            <ListGroup/>
            <FriendList onSelectFriend={handleFriendSelection} friendList={friends} />
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