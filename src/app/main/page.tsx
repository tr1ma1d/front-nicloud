'use client';
import './style-main.scss';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import FriendList from '@/components/FriendList';
import ChatHeader from '@/components/ChatHeader';
import Message from '@/components/Message';
import MessageInput from '@/components/MessageInput';
import { useFetchFriendsQuery } from '@/store/friendListApi';
import { useChat } from '@/hooks/useChatHook';


export default function Home() {
    const user = useSelector((state: RootState) => state.user);
    const { chatHistory, selectedFriend, handleSendMessage, handleFriendSelection, msgContainer } = useChat(user);
    const { data: friends } = useFetchFriendsQuery(user.id, {
        pollingInterval: 1000, // Запрос каждые 5 секунд
    });
    return (
        <div className="main-page">
            {
                <FriendList onSelectFriend={handleFriendSelection} friendList={friends} />
            }
            <main className="message-block">
                <div className="message-history">
                    <ChatHeader selectedFriend={selectedFriend} />
                    <div ref={msgContainer} className="container_message">
                        <div className="msg-con " >
                            {chatHistory.map((msg) => (
                                <Message key={msg.id} username={msg.username} content={msg.content} />
                            ))}
                        </div>
                    </div>
                </div>
                <MessageInput onSendMessage={handleSendMessage} />
            </main>
        </div>
    );
}