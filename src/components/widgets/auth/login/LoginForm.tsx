import ButtonAuth from "@/components/buttons/ButtonAuth";
import { useForm } from "@/hooks/useForm";
import { useLogin } from "@/hooks/useLogin";

export const LoginForm = () => {
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
  