import { FC, useState } from "react";
import Image from "next/image";
import { EditPerson } from "../popups/EditPerson";

interface ProfileProps {
    data: any;
}


export const UserProfile: FC<ProfileProps> = ({ data }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const openEditor = () => {
        setIsOpen(true);
    }
    const closeEditor = () => {
        setIsOpen(false);
    }

    return (
        <div className="w-full flex justify-center items-center flex-col">
            <div className="profile__image group" onClick={openEditor}>
                <Image
                    src="/logotype-example.svg"
                    alt="logo"
                    layout="fill"
                    objectFit="cover"
                />
                <div className="absolute z-50 inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 cursor-pointer">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-2 transition-all duration-200">
                        Изменить
                    </span>
                </div>
            </div>
            <div className="profile-info">
                <span className="profile__text-username">{data.username}</span>
            </div>
            <EditPerson isOpen={isOpen} onClose={closeEditor}/>
        </div>
    );
}