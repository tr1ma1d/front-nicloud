export interface ChatGroup{
    id: string;
    name: string;
}

export interface MessageDB{
    id: string;
    chatId: string;
    userId: string;
    content: string;
    createdAt: string;
    isRead: boolean | undefined;
}

export interface MessageContent{
    id: string;
    chatName: string;
    senderName: string;
    content: string;
    createAt: string;
    isRead: boolean | undefined;
}