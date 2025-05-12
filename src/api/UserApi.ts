import { User } from "@/core/User"; // Импортируем класс User
import { UserState } from "@/utils/models/user.model";
import axios from "axios";

export default class AuthApi {

    // Метод для получения данных
    static async fetchData(): Promise<any> {
        try {
            const response = await axios.get<User[]>(`${process.env.NEXT_PUBLIC_MAIN_API}/im/user/userList`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw new Error('Failed to fetch user data');
        }
    }

    // Метод для регистрации пользователя
    static async registerUser(username: string, password: string, email: string, phone: string): Promise<void> {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_MAIN_API}/im/user/register`, {
                username,
                password,
                email,
                phone,
            });
        } catch (error) {
            console.error('Registration failed:', error);
            throw new Error('Registration failed');
        }
    }

    // Метод для входа пользователя
    static async loginUser(username: string, password: string): Promise<User> {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_MAIN_API}/im/user/login`, {
                username,
                password,
            });
    
            const data = response.data;
            return User.fromJSON(data);
        } catch (error) {
            console.error('Login failed:', error);
            throw new Error('Login failed');
        }
    }
    static async update(user: UserState): Promise<UserState>{
        const response = await axios.put(`${process.env.NEXT_PUBLIC_MAIN_API}/im/user/update`, {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            phone: user.phone
        });
        const data = response.data;
        return User.fromJSON(data);
    }


    static async searchUser(searchQuery: string): Promise<User[]> {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_MAIN_API}/im/user/search-users`, {
                username: searchQuery,
            });
    
            const data = response.data;
            return data.map((userData: any) => User.fromJSON(userData));
        } catch (error) {
            console.error('Error during searchUser execution:', error);
            throw new Error('Failed to search users');
        }
    }
}
