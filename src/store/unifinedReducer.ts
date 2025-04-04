import  {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const unifiedApi  = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_MAIN_API}` }),
    endpoints: (builder) => ({
        fetchFriends: builder.query<Friend[], string>({
            query: (userId) => ({
                url: `im/direct/friendList`,
                params: { userId },
            }),
        }),
        fetchChat: builder.query<Chat[], string>({
            query:(userId) => ({
                url: 'im/chat-group/user',
                method: "POST",
                params: { userId }
            })
        }),
    }),
});

export const { useFetchFriendsQuery, useFetchChatQuery } = unifiedApi;

export interface Friend {
    id: string;
    username: string;
    avatar: string;
}
export interface Chat{
    chat_id: string;
    name: string;
    created_at: string;
}