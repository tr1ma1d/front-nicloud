import ButtonAuth from "@/components/buttons/ButtonAuth";
import { useForm } from "@/hooks/useForm";
import { useRegister } from "@/hooks/useRegister";

export const RegisterForm = ({ toggleForm }: { toggleForm: () => void }) => {
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
  
  