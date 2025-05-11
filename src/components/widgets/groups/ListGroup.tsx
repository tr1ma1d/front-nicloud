'useClient'
import { ButtonAddGroup } from "@/components/buttons/ButtonAddGroup";
import { ItemGroup } from "./ItemGroup";
import { Chat } from "@/store/unifinedReducer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FC, useContext, useEffect } from "react";
import { CustomThemeContext } from "@/hooks/useCustomThemeContext";

type ChatListProps = {
    onSelectedChat: (chat: Chat) => void;
    chatList?: Chat[];
    onOpenPopup: () => void;
}

export const ListGroup: FC<ChatListProps> = ({
    onSelectedChat,
    chatList,
    onOpenPopup,
}) => {
    useEffect(() => {
        console.log("CHAT ITEM", chatList);
    }, [chatList]);
    const context = useContext(CustomThemeContext);
    if (!context) {
        throw new Error('ThemeToggle must be used within a CustomThemeProvider');
    }
    const { theme } = context;
    return (
        <div className={`bg-white/15 h-[820px] w-[100px] rounded-xl backdrop-blur-sm border-2 ${theme.title === 'light' ? "border-white" : "border-gray-700"} flex flex-col items-center box-border py-4`}>
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