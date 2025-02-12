'use client';
import './style-main.scss';
import type { AppDispatch, RootState } from '@/store/store';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { connectToChatHub, takeChatHistory } from '@/api/signalrService';
import { HubConnection } from '@microsoft/signalr';
import FriendList from '@/components/FriendList';
import ChatHeader from '@/components/ChatHeader';
import Message from '@/components/Message';
import MessageInput from '@/components/MessageInput';
import { useRouter } from 'next/navigation';
import { useFetchFriendsQuery } from '@/store/friendListApi';


export default function Home() {
    const user = useSelector((state: RootState) => state.user);
    const [selectedFriend, setSelectedFriend] = useState<{ id: string; username: string } | null>(null);
    const { data: friends } = useFetchFriendsQuery(user.id, {
        pollingInterval: 1000, // Запрос каждые 5 секунд
    });
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [chatHistory, setChatHistory] = useState<{ id: string; senderId: string; username: string, content: string }[]>([]);

    const router = useRouter();
    const msgContainer = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (user == null) {
            router.replace('/auth');
            return;
        }
    
        // Только если соединение еще не установлено
        if (!connection) {
            const initConnection = async () => {
                try {
                    const conn = await connectToChatHub(user.id);
                    setConnection(conn);
    
                    // Подписка на событие только один раз
                    conn.on("ReceiveMessage", (senderId, username, content) => {
                        const newMessage = {
                            id: crypto.randomUUID(),
                            senderId: senderId,
                            username: username,
                            content: content,
                        };
                        console.log('Получил ли я сообщение?');
                        setChatHistory((prevMessages) => [...prevMessages, newMessage]);
                        
                    });
                    
                } catch (err) {
                    console.error('Error initializing SignalR connection:', err);
                }
            };
    
            initConnection();
        }
    
        return () => {
            if (connection) {
                console.log('Отключение SignalR -------------------------------------------------------------------');
                connection.off("ReceiveMessage");
            }
        };
    }, [user, connection]); 
    // Эффект для автоскролла вниз при изменении истории сообщений
    useEffect(() => {
        if (msgContainer.current) {
            msgContainer.current.scrollTop = msgContainer.current.scrollHeight;
        }
    }, [chatHistory]);
     // Обработка отправки сообщения
     const handleSendMessage = async (message: string) => {
        if (connection) {
            connection.invoke('SendMessage', selectedFriend?.id, message)
                .catch(err => console.error('Error sending message:', err));

        }
        // Очищаем поле ввода сообщения
    };

    // Загружаем историю сообщений и подключаемся к SignalR при выборе друга
    const handleFriendSelection = async (friend: { id: string; username: string; }) => {
        setSelectedFriend(friend);
        try {
            // Загружаем историю сообщений
            const history = await takeChatHistory(user.id, friend.id, connection!);

            // Обрабатываем историю сообщений (заменяем senderId на username)
            const updatedHistory = history.map((msg: any) => ({
                ...msg,
                senderId: msg.senderId === friend.id ? friend.username : user.username
            }));
            setChatHistory(updatedHistory); // Обновляем историю сообщений в Redux
            // Делаем паузу, чтобы React успел отрендерить новые сообщения
            setTimeout(() => {
                if (msgContainer.current) {
                    msgContainer.current.scrollTop = msgContainer.current.scrollHeight;
                }
            }, 0);

        } catch (error) {
            console.error("Ошибка при обработке выбора друга:", error);
        }

    };


   
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