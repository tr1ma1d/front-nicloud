import { useState } from "react";

export const useWallpaperHook = (src: string) =>{
    const [bgWrapper, setBgWrapper] = useState("");

    const uploadWallpaperChange = async (e: React.ChangeEvent<HTMLInputElement>):Promise<void> => {
        e.preventDefault();
        setBgWrapper(src);
        
    }
    return {bgWrapper, uploadWallpaperChange};
}