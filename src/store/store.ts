import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'; // Импортируем редьюсер из userSlice

export const store = configureStore({
    reducer: {
        user: userReducer, // Добавляем редьюсер в хранилище
    },
});
// Тип для корневого состояния (RootState)
export type RootState = ReturnType<typeof store.getState>;
// Тип для dispatch
export type AppDispatch = typeof store.dispatch;
