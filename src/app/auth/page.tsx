'use client'
import { useState } from "react";

export default function Home() {
    const [isLogin, setLoginForm] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        configPassword: "",
        email: "",
        phone: "",
    });
    //вместо того, чтобы создавать кучу useState не нужных, можно просто обойтись этим методом
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target; // Извлекаем name и value из события
        setFormData((prevFormData) => ({
            ...prevFormData, // Копируем предыдущее состояние
            [name]: value,  // Обновляем значение для соответствующего поля
        }));
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLogin) {
            // Если отображается форма Login
            console.log("Login Data:", {
                username: formData.username,
                password: formData.password,
            });
        } else {
            // Если отображается форма Register
            console.log("Register Data:", formData);
        }
    }

    const toggleForm = () => {
        setLoginForm(!isLogin);
    }

    return (
        <div>
            <h1>{isLogin ? "Login" : "Registration"}</h1>
            {isLogin ? <LoginForm formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit} /> :
                <RegisterForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit} />}

            <button onClick={toggleForm}>
                {isLogin ? "Перейти к регистрации" : "Перейти к логину"}
            </button>
        </div>
    );
}


const RegisterForm = ({ formData, handleSubmit, handleChange }: any) => {
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <input type="password" placeholder="Confirm Password" value={formData.configPassword} onChange={handleChange} />
            <input type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="text" placeholder="Phone" value={formData.phone} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    )
}

const LoginForm = ({ formData, handleSubmit, handleChange }: any) => {
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    )
}