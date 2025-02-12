import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import AuthApi from "@/api/UserApi";
import { AppDispatch } from "@/store/store";
import { setUser } from "@/store/userSlice";
import { UserState } from "@/store/userSlice";

export const useLogin = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const loginUser = async (formData: Record<string, string>) => {
    try {
      const user = await AuthApi.loginUser(formData.username, formData.password);

      // Преобразуем данные пользователя в структуру UserState
      const userData: UserState = {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
        phone: user.phone,
      };

      dispatch(setUser(userData));
      router.replace("/main");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return { loginUser };
};
