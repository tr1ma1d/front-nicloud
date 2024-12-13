'use client';
import Image from 'next/image';
import MessageHistory from '@/components/MessageHistory';
import './style-main.scss';
import type { AppDispatch, RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchFriendsQuery } from '@/store/friendListApi';
import { connectToChatHub, takeChatHistory } from '@/api/signalrService';
import { HubConnection } from '@microsoft/signalr';
export default function Home() {
    const user = useSelector((state: RootState) => state.user);
    const messages = useSelector((state: RootState) => state.message);
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    
    const [selectedFriend, setSelectedFriend] = useState<null | { id: string; username: string }>(null);
    const [connection, setConnection] = useState<HubConnection | null>(null);


    const { data: friends, isLoading, error } = useFetchFriendsQuery(user.id);
    const [chatHistory, setChatHistory] = useState<{ id: string, senderId: string; content: string }[]>([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        const initConnection = async () => {
            try {
                const conn = await connectToChatHub(user.id);
                setConnection(conn);
                conn.on("ReceiveMessage", (user, message) => {
                    console.log(`${user}: ${message}`);
                    const newMessage = {
                        id: crypto.randomUUID(),
                        senderId: user,
                        content: message,
                    };
                    setChatHistory((prevMessages) => [...prevMessages, newMessage]);
                }); 
            } catch (err) {
                console.error('Error initializing SignalR connection:', err);
            }
        };
    
        initConnection();
    
        return () => {
            connection?.stop().then(() => console.log('SignalR connection stopped.'));
        };
    }, [user, router]); 

    // Загружаем историю сообщений и подключаемся к SignalR при выборе друга
    const handleFriendSelection = async (friend: { id: string; username: string }) => {
        setSelectedFriend(friend);
        try {
            // Загружаем историю сообщений
            const history = await takeChatHistory(user.id, friend.id);
            
            // Обрабатываем историю сообщений (заменяем senderId на username)
            const updatedHistory = history.map((msg: any)=> ({
                ...msg, 
                senderId: msg.senderId === friend.id ? friend.username : user.username
            }));
            setChatHistory(updatedHistory); // Обновляем историю сообщений в Redux
          
        } catch (error) {
            console.error("Ошибка при обработке выбора друга:", error);
        }
    };


    // Обработка отправки сообщения
    const handleSendMessage = async () => {
        if(connection){
            connection.invoke('SendMessage', user.id, selectedFriend?.id || '', messageInput)
               .catch(err => console.error('Error sending message:', err));
            setMessageInput('');
        }
    };

    return (
        <div className="main-page">
            <div className="friend-list">
                { /* render frined-list history */}

                <div className="profile">
                    <div className="profile__image">
                        <Image src="/logotype-example.svg" alt={'logo'} layout='fill' objectFit='cover' />
                    </div>
                    <div className="profile-info">
                        <span className="profile__text-username">{user.username}</span>
                        <span className="profile__text-email">{user.id}</span>
                    </div>
                </div>
                {
                    friends?.map((friend) => (
                        <div
                            key={friend.id}
                            onClick={() => handleFriendSelection(friend)}
                        >
                            <MessageHistory username={friend.username} />
                        </div>
                    ))
                }

            </div>
            <main className="message-block">
                <div className="message-history">
                    <div className="message-header">
                        <div className="header-username">
                            <div className="logo-friend">
                                <Image src="/logotype-example.svg" alt={'logo'} layout='fill' objectFit='cover' />
                            </div>
                            <div className="header-username">
                                <span className="header-username__text">
                                    {selectedFriend?.username || 'Select a friend'}
                                </span>
                            </div>
                        </div>
                        <div className="header_text">
                            <span>Chat</span>
                        </div>
                        <div className="header-button_action">
                            <button className="call">
                                <Image src="/phone.svg" alt='phone' objectFit='contain' layout='fill' />
                            </button>
                            <button className="option">
                                <Image src="/dot.svg" alt='option' layout='fill' />
                            </button>
                        </div>
                    </div>
                    <div className="container_message">
                        {
                            chatHistory.map((message, index) => (
                                <div className = "msg" key={message.id}>
                                    <div className="message_logo">
                                        <Image src="/logotype-example.svg" alt={'logo'} layout='fill' objectFit='cover'/>
                                    </div>
                                    <div className="message-container">
                                        <span className ="message__nickname">{message.senderId}</span>
                                        <p className="message__text">{message.content}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="input-message">
                    <input type="text"
                        placeholder="Type..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <div className="send-message__container">
                        <button onClick={handleSendMessage}>
                            <Image src="/arrow-right.svg" alt="arrow" objectFit="none" layout='fill' />
                        </button>
                    </div>
                </div>
            </main>

        </div>
    );
}