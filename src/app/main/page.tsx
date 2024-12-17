'use client';
import './style-main.scss';
import type { AppDispatch, RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { connectToChatHub, takeChatHistory } from '@/api/signalrService';
import { HubConnection } from '@microsoft/signalr';
import FriendList from '@/components/FriendList';
import ChatHeader from '@/components/ChatHeader';
import Message from '@/components/Message';
import MessageInput from '@/components/MessageInput';

export default function Home() {
    const user = useSelector((state: RootState) => state.user);
    const [selectedFriend, setSelectedFriend] = useState<{ id: string; username: string } | null>(null);
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [chatHistory, setChatHistory] = useState<{ id: string; senderId: string; content: string }[]>([]);



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
    }, [user]);

    // Загружаем историю сообщений и подключаемся к SignalR при выборе друга
    const handleFriendSelection = async (friend: { id: string; username: string }) => {
        setSelectedFriend(friend);
        try {
            // Загружаем историю сообщений
            const history = await takeChatHistory(user.id, friend.id);

            // Обрабатываем историю сообщений (заменяем senderId на username)
            const updatedHistory = history.map((msg: any) => ({
                ...msg,
                senderId: msg.senderId === friend.id ? friend.username : user.username
            }));
            setChatHistory(updatedHistory); // Обновляем историю сообщений в Redux

        } catch (error) {
            console.error("Ошибка при обработке выбора друга:", error);
        }
    };


    // Обработка отправки сообщения
    const handleSendMessage = async (message: string) => {
        if (connection) {
            connection.invoke('SendMessage', user.id, selectedFriend?.id || '', message)
                .catch(err => console.error('Error sending message:', err));
        }
    };

    return (
        <div className="main-page">
            <FriendList onSelectFriend={handleFriendSelection} />
            <main className="message-block">
                <div className="message-history">
                    <ChatHeader selectedFriend={selectedFriend} />
                    <div className="container_message">
                        {chatHistory.map((msg) => (
                            <Message key={msg.id} senderId={msg.senderId} content={msg.content} />
                        ))}
                    </div>
                </div>
                <MessageInput onSendMessage={handleSendMessage} />
            </main>
        </div>
    );
}