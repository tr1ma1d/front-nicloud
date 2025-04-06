'use client';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import FriendList from '@/components/widgets/friends/FriendList';
import ChatHeader from '@/components/ChatHeader';
import MessageInput from '@/components/MessageInput';
import { useFetchChatQuery, useFetchFriendsQuery } from '@/store/unifinedReducer';

import { useChat } from '@/hooks/useChatHook';

import ButtonEdit from '@/components/buttons/ButtonEdit';
import MessageContainer from '@/components/widgets/MessageContainer';

import { useContext } from 'react';
import { WallpaperContext } from '@/hooks/useWallpaperContext';
import { ListGroup } from '@/components/widgets/groups/ListGroup';


export default function Home() {
    const user = useSelector((state: RootState) => state.user);
    const { chatHistory, selectedFriend, selectedGroup, handleSendMessage, handleFriendSelection, handleGroupSelection, msgContainer } = useChat(user);
    const { data: friends } = useFetchFriendsQuery(user.id, {
        pollingInterval: 1000, // Запрос каждые 5 секунд
    });

    const { data: groupList } = useFetchChatQuery(user.id, {
        pollingInterval: 1000,
    });

    const context = useContext(WallpaperContext);

    if (!context) {
        throw new Error('WallpaperContext must be used within a WallpaperProvider');
    }
    
    const { wallpaper } = context;
    const nameChat: string = selectedFriend?.username === null ? selectedGroup?.name ?? "Default Name" : selectedFriend?.username ?? "Default Name";
    return (
        <div className="main-page" style={{
            backgroundImage: `url(${wallpaper.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 2s ease-in-out'
        }}>
            <ListGroup onSelectedChat={handleGroupSelection} chatList={groupList}/>
            <FriendList onSelectFriend={handleFriendSelection} friendList={friends} />
            <main className="message-block">
                <div className="message-history">
                    <ChatHeader selectedFriend={nameChat} />
                    <MessageContainer msgContainer={msgContainer} chatHistory={chatHistory} />
                </div>
                <MessageInput onSendMessage={handleSendMessage} />
            </main>
            <ButtonEdit />
        </div>
    );
    
}