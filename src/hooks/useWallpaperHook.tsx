import { getWallpapers } from "@/lib/getWallpaper";
import { useEffect, useState } from "react";

export const useWallpaperHook = () =>{
    const [bgWrapper, setBgWrapper] = useState("");
    useEffect(() => {
        const defaultWallpaper = getWallpapers();
        console.log(defaultWallpaper);
        setBgWrapper(defaultWallpaper[5].src);
    }, []);
    return {bgWrapper, setBgWrapper};
}