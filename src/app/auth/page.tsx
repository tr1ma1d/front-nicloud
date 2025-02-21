'use client';
import "./style.scss";
import { useState } from "react";

import Image from "next/image";
import { LoginForm } from "@/components/widgets/auth/login/LoginForm";
import { RegisterForm } from "@/components/widgets/auth/register/RegisterForm";

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
      {isLogin ? (
        <button className="auth-toggle-button" onClick={toggleForm}>
          Зарегистрироваться
        </button>
      ) : (
        <button className="auth-toggle-button" onClick={toggleForm}>
          Авторизироваться
        </button>
      )}
    </div>
  );
}

