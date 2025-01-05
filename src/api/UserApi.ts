import  { User }  from "@/core/User"; // Импортируем класс User

export default class AuthApi {

    // Метод для получения данных
    static async fetchData(): Promise<any> {
        const response = await fetch("https://localhost:44336/im/user/userList");
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data;
    }

    // Метод для регистрации пользователя
    static async registerUser(username: string, password: string, email: string, phone: string): Promise<void> {
        const response = await fetch("https://localhost:44336/im/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
                email,
                phone
            }),
        });
    
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Registration failed: ${errorResponse.message || 'Unknown error'}`);
        }
    }

    // Метод для входа пользователя
    static async loginUser(username: string, password: string): Promise<User> {
        const response = await fetch("https://localhost:44336/im/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        // Получаем данные пользователя в формате JSON
        const data = await response.json();

        // Преобразуем полученные данные в объект User
        return User.fromJSON(data);
    }


    static async searchUser(searchQuery: string): Promise<User[]> {
        console.log('Sending search query:', searchQuery);
    
        try {
            const response = await fetch(`https://localhost:44336/im/user/search-users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: searchQuery,
                }),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server responded with an error:', errorText);
                throw new Error('Enter just the username');
            }
    
            const data = await response.json();
            console.log('Received data:', data);
    
            return data.map((userData: any) => User.fromJSON(userData));
        } catch (error) {
            console.error('Error during searchUser execution:', error);
            throw error;
        }
    }
}
