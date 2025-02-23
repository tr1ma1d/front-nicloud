import { FC } from "react";

interface IUploadProps {
    loadWallpaper: (file: File) => void;
}

export const UploadPaper: FC<IUploadProps> = ({ loadWallpaper }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            loadWallpaper(file); // Передаем файл в handleLoadWallpaper
        }
    };

    return (
        <div className="rounded flex flex-col items-center cursor-pointer w-[150px] backdrop-blur-sm hover:scale-110 transition duration-280 ease-in-out">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="upload-input"
            />
            <label htmlFor="upload-input" className="w-[150px] h-[150px] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <span className="text-gray-500">Upload</span>
            </label>
        </div>
    );
};