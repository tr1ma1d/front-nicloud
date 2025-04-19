import UserApi from "@/api/UserApi";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";



export const AddGroupForm = () => {
    const { formData, handleChange, resetForm } = useForm({
        chatname: "",

    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //TODO relalize
    }
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


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="chatname"
                    placeholder="Type name of group..."
                    value={formData.chatname}
                    onChange={handleChange}
                />
            </form>
        </div>
    );
}