'use client'
import { wallpaperManager } from "@/lib/wallpaper.module";
import { createContext, FC, ReactNode, useState } from "react";

interface Wallpaper {
    title: string;
    src: string;
}
interface WallpaperContextProps {
    wallpaper: Wallpaper;
    changeWallpaper: (title: string, src: string) => void;
    loadWallpaper: (file: File) => void;   // Загрузить собственное изображение   // Загрузить обои (добавляется в начало списка)
    refreshWallpapers: () => Wallpaper[]; // Обновить список обоев  // Возвращает текущий список обоев   // Возвращает текущий список обоев   // Возвращает текущий список обоев  // Возвращает текущий список обоев  // Возвращает текущий список обоев  // Возвращает текущий спис
}

export const WallpaperContext = createContext<WallpaperContextProps | undefined>(undefined);
export const WallpaperProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [wallpaper, setWallpaper] = useState<Wallpaper>({ title: 'Wallpaper 1', src: '/wallpapers/bg.jpg' });

    const changeWallpaper = (title: string, src: string) => {
        setWallpaper({ title: title, src: src });
    }
    const loadWallpaper = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            
            const src = reader.result as string;
            setWallpaper({ title: file.name, src: src });
            wallpaperManager.uploadWallpaper(file.name, src);
        }
        reader.readAsDataURL(file);
    }
    const refreshWallpapers = () => {
        return wallpaperManager.data; // Возвращаем обновленный список обоев
    };
    return (
        <WallpaperContext.Provider value={{
            wallpaper, changeWallpaper, loadWallpaper, refreshWallpapers
        }}>
            {children}
        </WallpaperContext.Provider>
    );
}   
