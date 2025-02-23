import { FC, TimeHTMLAttributes } from "react";


interface IUploadProps{
    loadWallpaper: (src: string) => void;
}

export const UploadPaper:FC<IUploadProps> = (props) => {
    return (
        <div
            className="flex flex-col items-center cursor-pointer w-[150px] hover:scale-110 transition duration-280 ease-in-out"
            onClick={() => props.loadWallpaper('props.wallpaper.src')}
        >
            <div className="w-[150px] h-[150] relative">
            </div>
        </div>
    );

}
