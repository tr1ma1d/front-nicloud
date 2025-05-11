import MessageHistory from "@/components/MessageHistory";
import { Friend } from "@/store/unifinedReducer";
import { FC } from "react";

interface FriendProps {
    data: any;
    onSelectFriend: (friend: { id: string; username: string }) => void;
}

export const FriendItem: FC<FriendProps> = ({ data, onSelectFriend }) => {
    return (
        <div key={data.id} onClick={() => onSelectFriend(data)}>
            <MessageHistory username={data.username} />
        </div>
    );
}