import MessageHistory from "@/components/MessageHistory";
import { Friend } from "@/store/friendListApi";
import { FC } from "react";

interface FriendProps {
    data: any;
    onSelectFriend: (friend: { id: string; username: string }) => void;
}

export const FriendItem: FC<FriendProps> = ({ data, onSelectFriend }) => {
    return (
        <div key={data.id} onClick={() => onSelectFriend(data)} className="friend-list__item">
            <MessageHistory username={data.username} />
        </div>
    );
}