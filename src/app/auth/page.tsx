'use client'
import "./style.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ButtonAuth from "@/components/ButtonAuth";
import AuthApi from "@/api/UserApi";


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


    const toggleForm = () => {
        setLoginForm(!isLogin);
    }

    return (
        <div className="auth-content">
            <h1 className="auth_title">{isLogin ? "Login" : "Registration"}</h1>
            <div className="auth-container">
                <div className="auth__image">
                    <Image src="/river-blue.jpg"
                        alt="background-photo"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="form-container">
                    {isLogin ? <LoginForm formData={formData}
                        handleChange={handleChange}
                    /> :
                        <RegisterForm
                            formData={formData}
                            handleChange={handleChange}
                            toggleForm={toggleForm}
                        />}
                </div>
            </div>
            <button className="navigation-auth" onClick={toggleForm}>
                {isLogin ? "Перейти к регистрации" : "Перейти к логину"}
            </button>
        </div>
    );
}


const RegisterForm = ({ formData, handleChange, toggleForm }: any) => {
    const router = useRouter();
    const handleSubmit =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Вы можете сделать что-то с formData здесь
        await AuthApi.registerUser(formData.username, formData.password, formData.email, formData.phone) // Вызываем вашу API для регистрации
            .then((response) => {
                console.log("Register response:", response);
                toggleForm();
                
            })
            .catch((error) => {
                console.error("Register error:", error);
            });
        console.log("Register Data:", formData);
    };

    return (
        <form className="auth-form" onSubmit={handleSubmit}>

            <input
                type="text"
                name="username" // Указываем имя поля
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password" // Указываем имя поля
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <input
                type="password"
                name="configPassword" // Указываем имя поля
                placeholder="Confirm Password"
                value={formData.configPassword}
                onChange={handleChange}
            />
            <input
                type="email"
                name="email" // Указываем имя поля
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="text"
                name="phone" // Указываем имя поля
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
            />
            <ButtonAuth onCLick={handleSubmit}>Регистрация</ButtonAuth>
        </form>
    );
};

const LoginForm = ({ formData, handleChange }: any) => {
    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        // Вы можете сделать что-то с formData здесь
        var user = await AuthApi.loginUser(formData.username, formData.password);
       
        console.log('USER: ' + user.username, user.password);
        console.log(formData.username + ": " + formData.password + "this is login form");
        if(user){
            router.replace('/main');
        }
    };
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="username" // Указываем имя поля
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password" // Указываем имя поля
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <ButtonAuth onCLick={handleSubmit}>Войти</ButtonAuth>
        </form>
    );
};