'useClient'
import { ButtonAddGroup } from "@/components/buttons/ButtonAddGroup";
import { ItemGroup } from "./ItemGroup";
import { Chat } from "@/store/unifinedReducer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FC, useEffect } from "react";

type ChatListProps = {
    onSelectedChat: (chat: Chat) => void;
    chatList?: Chat[];
    onOpenPopup: () => void;
}

export const ListGroup: FC<ChatListProps> = ({ onSelectedChat, chatList, onOpenPopup }) => {
    useEffect(() => {
        console.log("CHAT ITEM", chatList);
    }, [chatList]);
    return (
        <div className="bg-white/15 h-[820px] w-[100px] rounded-xl backdrop-blur-sm border-2 border-white flex flex-col items-center box-border py-4">
            {chatList?.length ? (
                chatList.map((chat) => (
                    <ItemGroup
                        key={chat.chatId}
                        chat={chat}
                        onSelectedChat={onSelectedChat}
                    />
                ))
            ) : (
                <div></div>
            )}
            <ButtonAddGroup onOpenPopup={onOpenPopup} />
        </div>
    );
}