'use client';
import { useFetchFriendsQuery } from '@/store/friendListApi';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import MessageHistory from '@/components/MessageHistory';
import Image from "next/image";
type FriendListProps = {
    onSelectFriend: (friend: { id: string; username: string }) => void;
};

export default function FriendList({ onSelectFriend }: FriendListProps) {
    const user = useSelector((state: RootState) => state.user);
    const { data: friends, isLoading, error } = useFetchFriendsQuery(user.id);

    if (isLoading) return <div>Loading friends...</div>;
    if (error) return <div>Error loading friends</div>;

    return (
        <div className="friend-list">
            <div className="profile">
                <div className="profile__image">
                    <Image src="/logotype-example.svg" alt={'logo'} layout='fill' objectFit='cover' />
                </div>
                <div className="profile-info">
                    <span className="profile__text-username">{user.username}</span>
                    <span className="profile__text-email">{user.id}</span>
                </div>
            </div>
            {friends?.map((friend) => (
                <div key={friend.id} onClick={() => onSelectFriend(friend)}>
                    <MessageHistory username={friend.username} />
                </div>
            ))}
        </div>
    );
}
