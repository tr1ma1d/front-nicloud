// Класс User с методами для преобразования из/в JSON
export class User {
    id: string;
    username: string;
    password: string;
    email: string;
    phone: string;

    constructor(id: string, username: string, password: string, email: string, phone: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
    }

    // Статический метод для парсинга данных из JSON в объект User
    static fromJSON(data: any): User {
        if (
            typeof data.id === 'string' &&
            typeof data.username === 'string' &&
            typeof data.password === 'string' &&
            typeof data.email === 'string' &&
            typeof data.phone === 'string'
        ) {
            return new User(data.id, data.username, data.password, data.email, data.phone);
        } else {
            throw new Error("Invalid user data format");
        }
    }

    // Метод для сериализации объекта User в JSON
    toJSON(): any {
        return {
            id: this.id,
            username: this.username,
            password: this.password,
            email: this.email,
            phone: this.phone
        };
    }
}