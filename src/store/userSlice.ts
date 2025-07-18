import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./store";
import { UserState } from '@/utils/models/user.model';


const initialState: UserState = {
    id: '',
    username: '',
    password: '',
    email: '',
    phone: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Устанавливаем нового пользователя
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        // Обновляем части информации о пользователе
        updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
            return { ...state, ...action.payload };
        },
    },
});

// Экспортируем действия, чтобы использовать их в компонентах
export const { setUser, updateUser } = userSlice.actions;

// Экспортируем редьюсер для подключения к хранилищу
export default userSlice.reducer;