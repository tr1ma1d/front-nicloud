import { ButtonAddGroup } from "@/components/buttons/ButtonAddGroup";
import { ItemGroup } from "./ItemGroup";
import { Chat } from "@/store/unifinedReducer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type ChatListProps = {
    onSelectedChat: (chat: {id: string; name: string}) => void;
    chatList?: Chat[];
}

export const ListGroup = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <>
            <div className="bg-white/15 h-[820px] w-[100px] rounded-xl backdrop-blur-sm border-2 border-white flex flex-col items-center box-border py-4">
                <ItemGroup/>
                <div>make map group</div>
                <ItemGroup/>
                <ButtonAddGroup/>
            </div>
        </>
    );
}