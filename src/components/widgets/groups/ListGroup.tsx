import { ButtonAddGroup } from "@/components/buttons/ButtonAddGroup";
import { ItemGroup } from "./ItemGroup";
import { Chat } from "@/store/unifinedReducer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FC, useEffect } from "react";

type ChatListProps = {
    onSelectedChat: (chat: {chat_id: string; name: string}) => void;
    chatList?: Chat[];
}

export const ListGroup:FC<ChatListProps> = ({onSelectedChat, chatList}) => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <>
            <div className="bg-white/15 h-[820px] w-[100px] rounded-xl backdrop-blur-sm border-2 border-white flex flex-col items-center box-border py-4">
                <ItemGroup/>
                <div>make map group</div>
                {
                    chatList?.map((chat, index) => (
                        <ItemGroup key={index}/>
                    ))
                }
                <ButtonAddGroup/>
            </div>
        </>
    );
}