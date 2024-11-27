import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "./store";

interface UserState{
    id: string;
    username: string;
    password: string;
    email: string;
    phone: string;
}


const initialState : UserState = {
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
        setUser: (state, action: PayloadAction<UserState>) => {
            return action.payload;
        },
        updateUser: (state, action: PayloadAction<UserState>) =>{
            return {...state,...action.payload};
        }, 
    },  
});