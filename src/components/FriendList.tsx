'use client';
import { useFetchFriendsQuery } from '@/store/friendListApi';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import MessageHistory from '@/components/MessageHistory';
import Image from "next/image";
import UserApi from '@/api/UserApi'; // Импорт для `searchUser`

type FriendListProps = {
    onSelectFriend: (friend: { id: string; username: string }) => void;
};

export default function FriendList({ onSelectFriend }: FriendListProps) {
    const user = useSelector((state: RootState) => state.user);
    const { data: friends, isLoading, error } = useFetchFriendsQuery(user.id);
    const [searchFriend, setSearchFriend] = useState<string>('');
    const [searchResults, setSearchResults] = useState<{ id: string; username: string }[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Функция для поиска пользователей
    const searchUser = async (query: string) => {
        try {
            var users = await UserApi.searchUser(query); 
            console.log(users); // Например, [{ id: '1', username: 'John' }, { id: '2', username: 'Doe' }]
            setSearchResults(users); // Устанавливаем массив пользователей в состояние
        } catch (err) {
            console.error('Error searching users:', err);
        }
    };

    // Обработка ввода в поле поиска
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchFriend(value);

        if (value.trim()) {
            searchUser(value); // Выполняем поиск, если есть текст
        } else {
            setSearchResults([]); // Сбрасываем результаты поиска
        }
    };

    if (isLoading) return <div>Loading friends...</div>;
    if (error) return <div>Error loading friends</div>;

    const displayList = searchFriend.trim() ? searchResults : friends;

    return (
        <div className="friend-list">
            <div className="profile">
                <div className="profile__image">
                    <Image 
                        src="/logotype-example.svg" 
                        alt="logo" 
                        layout="fill" 
                        objectFit="cover" 
                    />
                </div>
                <div className="profile-info">
                    <span className="profile__text-username">{user.username}</span>
                    <span className="profile__text-email">{user.id}</span>
                </div>
            </div>

            {/* Поле поиска */}
            <input
                type="text"
                value={searchFriend}
                onChange={handleSearchChange}
                placeholder="Search friends or users..."
                className="search-input"
            />

            {/* Результаты или список друзей */}
            <div className="friend-list__items">
                {isSearching ? (
                    <div>Searching...</div>
                ) : displayList?.length ? (
                    displayList.map((friend) => (
                        <div
                            key={friend.id}
                            onClick={() => onSelectFriend(friend)}
                            className="friend-list__item"
                        >
                            <MessageHistory username={friend.username} />
                        </div>
                    ))
                ) : (
                    <div>No users found</div>
                )}
            </div>
        </div>
    );
}
