import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// Определяем базовый URL и эндпоинты API
export const friendsApi = createApi({
    reducerPath: 'friendsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:44336/' }), // Заменить на реальный URL бэка
    endpoints: (builder) => ({
        fetchFriends: builder.query<Friend[], string>({
            query: (userId) => ({
                url: `im/direct/friendList`,
                params: { userId }, // Передаем userId как query-параметр
            }),
        }),
    }),
});
 
// Экспортируем автоматически созданные хуки
export const { useFetchFriendsQuery } = friendsApi;

// Тип для друзей (определяем, как выглядят объекты друзей)
export interface Friend {
    id: string;
    username: string;
    avatar: string;
}