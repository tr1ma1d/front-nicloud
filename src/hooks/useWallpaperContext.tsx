'use client'
import { createContext, FC, ReactNode, useState } from "react";

interface Wallpaper{
    title: string;
    src: string;
}
interface WallpaperContextProps{
    wallpaper: Wallpaper;    
    changeWallpaper: (title: string, src: string) => void;  
}

export const WallpaperContext = createContext<WallpaperContextProps | undefined>(undefined);
export const WallpaperProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const[wallpaper, setWallpaper] = useState<Wallpaper>({title: 'Wallpaper 1', src: '/wallpapers/bg.jpg'});

    const changeWallpaper = (title: string, src: string) => {
        setWallpaper({title: title, src: src});
    }
    return(
        <WallpaperContext.Provider value = {{wallpaper, changeWallpaper}}>
            {children}
        </WallpaperContext.Provider>
    );
}   
