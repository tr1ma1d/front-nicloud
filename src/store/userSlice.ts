import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from "./store";

export interface UserState {
    id: string;
    username: string;
    password: string;
    email: string;
    phone: string;
}

const initialState: UserState = {
    id: '01935924-5d67-72d8-a807-67fb67ac0ba0',
    username: 'nikitosik',
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