import { Friend } from '@/store/unifinedReducer';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import UserApi from '@/api/UserApi'; // Импорт для `searchUser`
import { FriendItem } from './FriendItem';
import { UserProfile } from '../user/UserProfile';

type FriendListProps = {
    onSelectFriend: (friend: { id: string; username: string }) => void;
    friendList?: Friend[]; 
};

export default function FriendList({ onSelectFriend, friendList }: FriendListProps) {
    const user = useSelector((state: RootState) => state.user);

    const [searchFriend, setSearchFriend] = useState<string>('');
    const [searchResults, setSearchResults] = useState<{ id: string; username: string }[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Функция для поиска пользователей
    const searchUser = async (query: string) => {
        try {
            var users = await UserApi.searchUser(query);
            console.log(users);
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



    const displayList = searchFriend.trim() ? searchResults : friendList;

    return (
        <div className="friend-list">
            <div className="profile">
                <UserProfile data={user} />
            </div>

            <input
                type="text"
                value={searchFriend}
                onChange={handleSearchChange}
                placeholder="Search friends or users..."
                className="search-input"
            />

            <div className="friend-list__items">
                {isSearching ? (
                    <div>Searching...</div>
                ) : displayList?.length ? (
                    displayList.map((friend) => (
                        <FriendItem key={friend.id} data={friend} onSelectFriend={onSelectFriend} />

                    ))
                ) : (
                    <div>No users found</div>
                )}
            </div>

        </div>
    );
}
