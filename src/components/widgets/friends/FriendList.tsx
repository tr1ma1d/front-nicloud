import { Friend } from '@/store/unifinedReducer';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useContext, useState } from 'react';
import UserApi from '@/api/UserApi'; // Импорт для `searchUser`
import { FriendItem } from './FriendItem';
import { UserProfile } from '../user/UserProfile';
import { CustomThemeContext } from '@/hooks/useCustomThemeContext';

type FriendListProps = {
    onSelectFriend: (friend: { id: string; username: string }) => void;
    friendList?: Friend[]; 
};

export default function FriendList({ 
        onSelectFriend, 
        friendList 
    }: FriendListProps) {
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
    const context = useContext(CustomThemeContext);
    if (!context) {
        throw new Error('ThemeToggle must be used within a CustomThemeProvider');
    }
    const { theme } = context;


    const displayList = searchFriend.trim() ? searchResults : friendList;

    return (
        <div className="max-w-64 h-5/6 w-full bg-black/50 rounded-3xl backdrop-blur-sm flex flex-col items-center overflow-hidden p-2">
            <div className={`flex w-60 h-56 ${theme.title === 'light' ? "bg-[#2D2D2D] text-white" : "bg-white text-black"} flex-col justify-center items-center rounded-3xl mb-2`}>
                <UserProfile data={user} />
            </div>

            <input
                type="text"
                value={searchFriend}
                onChange={handleSearchChange}
                placeholder="Search friends or users..."
                className="flex justify-center w-full h-10 focus:outline-none text-black px-2.5 rounded-3xl"
            />

            <div className="w-full">
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
