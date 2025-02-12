'use client';
import "./style.scss";
import { useState } from "react";
import { useForm } from "@/hooks/useForm";

import Image from "next/image";
import ButtonAuth from "@/components/ButtonAuth";
import { useRegister } from "@/hooks/useRegister";
import { useLogin } from "@/hooks/useLogin";

export default function Home() {
  const [isLogin, setLoginForm] = useState(true);
  const toggleForm = () => setLoginForm((prev) => !prev);

  return (
    <div className="auth-content">
      <h1 className="auth_title">{isLogin ? "Login" : "Registration"}</h1>
      <div className="auth-container">
        <div className="auth__image">
          <Image
            src="/river-blue.jpg"
            alt="background-photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="form-container">
          {isLogin ? <LoginForm /> : <RegisterForm toggleForm={toggleForm} />}
        </div>
      </div>
      <button className="navigation-auth" onClick={toggleForm}>
        {isLogin ? "Перейти к регистрации" : "Перейти к логину"}
      </button>
    </div>
  );
}

const RegisterForm = ({ toggleForm }: { toggleForm: () => void }) => {
  const { formData, handleChange } = useForm({
    username: "",
    password: "",
    configPassword: "",
    email: "",
    phone: "",
  });

  const { registerUser } = useRegister();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerUser(formData, toggleForm);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        type="password"
        name="configPassword"
        placeholder="Confirm Password"
        value={formData.configPassword}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <ButtonAuth onCLick={handleSubmit}>Регистрация</ButtonAuth>
    </form>
  );
};

const LoginForm = () => {
  const { formData, handleChange } = useForm({
    username: "",
    password: "",
  });

  const { loginUser } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(formData);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <ButtonAuth onCLick={handleSubmit}>Войти</ButtonAuth>
    </form>
  );
};
