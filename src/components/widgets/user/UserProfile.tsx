import { FC } from "react";
import Image from "next/image";

interface ProfileProps {
    data: any;
}


export const UserProfile: FC<ProfileProps> = ({ data }) => {
    return (
        <div className="w-full flex justify-center items-center flex-col">
            <div className="profile__image">
                <Image
                    src="/logotype-example.svg"
                    alt="logo"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="profile-info">
                <span className="profile__text-username">{data.username}</span>
                <span className="profile__text-email">{data.id}</span>
            </div>
        </div>
    );
}