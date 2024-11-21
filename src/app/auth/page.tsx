'use client'
import { useState } from "react";

export default function Home(){
    const [isLogin, setLoginForm] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        configPassword: "",
        email: "",
        phone: "",
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target; // Извлекаем name и value из события
        setFormData((prevFormData) => ({
            ...prevFormData, // Копируем предыдущее состояние
            [name]: value,  // Обновляем значение для соответствующего поля
        }));
    };
    const hangleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
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

    return(
        <div>
            
        </div>
    );
}


const RegisterForm = ({formData, handleSubmit, handleChange}: any) =>{
    return(
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

const LoginForm = ({formData, handleSubmit, handleChange}: any) =>{
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={formData.username} onChange={handleChange} />
            <input type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    )
}