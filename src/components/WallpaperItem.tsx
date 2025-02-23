import { FC } from "react";
import Image from "next/image";
type Wallpaper = {
    title: string;
    src: string;
}
interface WallpaperProps{
    wallpaper: Wallpaper;
    changeWallpaper: (title: string, src: string) => void;
    
}

export const WallpaperItem:FC<WallpaperProps> = (props) => {
    return (
        <div
            className="flex flex-col items-center cursor-pointer w-[150px] hover:scale-110 transition duration-280 ease-in-out"
            onClick={() => props.changeWallpaper(props.wallpaper.title, props.wallpaper.src)}
        >

            <div className="w-[150px] h-[150] relative">
                <Image
                    src={props.wallpaper.src}
                    alt={props.wallpaper.title}
                    fill
                    className="rounded object-cover w-[150px] h-[150px]"
                />
            </div>
        </div>
    );
}

