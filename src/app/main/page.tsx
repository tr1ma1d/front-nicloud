'use client';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import FriendList from '@/components/widgets/friends/FriendList';
import ChatHeader from '@/components/ChatHeader';
import MessageInput from '@/components/input/MessageInput';
import { useFetchChatQuery, useFetchFriendsQuery } from '@/store/unifinedReducer';

import { useChat } from '@/hooks/useChatHook';

import ButtonEdit from '@/components/buttons/ButtonEdit';
import MessageContainer from '@/components/widgets/MessageContainer';

import { useContext, useEffect, useState } from 'react';
import { CustomThemeContext } from '@/hooks/useCustomThemeContext';
import { ListGroup } from '@/components/widgets/groups/ListGroup';
import { PopupGroup } from '@/components/widgets/popups/PopupGroup';
import MessageInputGroup from '@/components/input/MessageInputGroup';
import { useRouter } from 'next/navigation';


export default function Home() {
    const user = useSelector((state: RootState) => state.user);
    const { chatHistory, headerName, handleSendMessage, handleSendGroup, handleFriendSelection, handleGroupSelection, msgContainer, currentChatType } = useChat(user);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const { data: friends } = useFetchFriendsQuery(user.id, {
        pollingInterval: 1000,
    });
    const router = useRouter();
    const { data: groupList } = useFetchChatQuery(user.id, {
        pollingInterval: 1000,
    });

    const context = useContext(CustomThemeContext);

    if (!context) {
        throw new Error('WallpaperContext must be used within a WallpaperProvider');
    }
    useEffect(() => {
        if(user.id === '' || (user.username === '' && user.password === '')){
            router.push('/auth');
        }
    }, [])

    const { wallpaper } = context;
    const nameChat: string = headerName;
    return (
        <div className="main-page" style={{
            backgroundImage: `url(${wallpaper.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background-image 2s ease-in-out'
        }}>
            <ListGroup onSelectedChat={handleGroupSelection}
                chatList={groupList}
                onOpenPopup={() => setIsOpenPopup(true)}
            />
            <FriendList
                onSelectFriend={handleFriendSelection}
                friendList={friends}
            />
            <main className="max-w-[800px] min-w-[400px] w-full overflow-hidden flex flex-col justify-between h-5/6 rounded-3xl backdrop-blur-sm">
                <div className="w-full h-[78vh] ">
                    <ChatHeader selectedFriend={nameChat} />
                    <MessageContainer msgContainer={msgContainer} chatHistory={chatHistory} />
                </div>
                {currentChatType === 'direct' ? <MessageInput onSendMessage={handleSendMessage} /> : <MessageInputGroup onSendMessage={handleSendGroup} />}

            </main>
            <ButtonEdit />
            <PopupGroup isOpen={isOpenPopup} onClose={() => setIsOpenPopup(false)} friendList={friends} currentUserId={user.id} />
        </div>
    );

}