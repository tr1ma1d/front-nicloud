import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'; 
import messageReducer from './messageSlice';// Импортируем редьюсер из userSlice
import { friendsApi } from './friendListApi'; 


const store = configureStore({
    reducer: {
        user: userReducer, 
        message: messageReducer,
        [friendsApi.reducerPath]: friendsApi.reducer,// Добавляем редьюсер в хранилище
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(friendsApi.middleware), 
});
// Тип для корневого состояния (RootState)
export type RootState = ReturnType<typeof store.getState>;
// Тип для dispatch
export type AppDispatch = typeof store.dispatch;

export default store;