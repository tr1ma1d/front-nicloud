import Image from 'next/image';
import { icons } from '@/utils/data/icons';
import { PopupGroup } from '../widgets/popups/PopupGroup';
import { FC, useState } from 'react';

type ButtonAddGroupProps = {
    onOpenPopup: () => void;
}

export const ButtonAddGroup:FC<ButtonAddGroupProps> = ({onOpenPopup}) => {

    return (
        <div className="w-16 h-16 bg-white/15 backdrop-blur-2 my-1 rounded-md overflow-hidden flex justify-center items-center hover:bg-white/35 duration-300 ease-in-out">
            <button className="w-1/2 h-1/2 relative" onClick = {onOpenPopup}>
                <Image
                    src={icons.plus}
                    alt="logo"
                    layout="fill"
                    objectFit="cover"
                />
            </button>
        </div>
    );
}