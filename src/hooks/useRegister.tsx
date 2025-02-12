import { useRouter } from "next/navigation";
import AuthApi from "@/api/UserApi";

export const useRegister = () => {
  const router = useRouter();

  const registerUser = async (formData: Record<string, string>, onSuccess: () => void) => {
    try {
      const response = await AuthApi.registerUser(
        formData.username,
        formData.password,
        formData.email,
        formData.phone
      );
      console.log("Register response:", response);
      onSuccess(); // Выполняем действие при успехе, например, переключаем форму
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return { registerUser };
};
