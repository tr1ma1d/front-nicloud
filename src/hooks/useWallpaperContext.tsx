'use client'
import { createContext, FC, ReactNode, useState } from "react";

interface Wallpaper {
    title: string;
    src: string;
}
interface WallpaperContextProps {
    wallpaper: Wallpaper;
    changeWallpaper: (title: string, src: string) => void;
    loadWallpaper: (src: string) => void;   // Загрузить собственное изображение   // Загрузить обои (добавляется в начало списка)
}

export const WallpaperContext = createContext<WallpaperContextProps | undefined>(undefined);
export const WallpaperProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [wallpaper, setWallpaper] = useState<Wallpaper>({ title: 'Wallpaper 1', src: '/wallpapers/bg.jpg' });

    const changeWallpaper = (title: string, src: string) => {
        setWallpaper({ title: title, src: src });
    }
    const loadWallpaper = (src: string) => {
        setWallpaper({ title: 'mywallpaper', src: src });
    }
    return (
        <WallpaperContext.Provider value={{
            wallpaper, changeWallpaper, loadWallpaper
        }}>
            {children}
        </WallpaperContext.Provider>
    );
}   
