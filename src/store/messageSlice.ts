import { createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface Message {
    id: string;
    sender: string;
    content: string;
    createAt: string;
}

export interface MessageState {
    messages: Message[];
}
// Начальное состояние
const initialState: MessageState = {
    messages: [
        {
            id: '',
            sender: '',
            content: '',
            createAt: '',
        },
        
    ],
};


export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        },
    },
});



export const {setMessage} = messageSlice.actions;


export default messageSlice.reducer;