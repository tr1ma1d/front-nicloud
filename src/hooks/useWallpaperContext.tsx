'use client';
import { createContext, FC, ReactNode, useState } from "react";

interface Wallpaper {
    title: string;
    src: string;
}

interface WallpaperContextProps {
    wallpaper: Wallpaper;
    allWallpapers: Wallpaper[]; // Добавляем список всех обоев
    changeWallpaper: (title: string, src: string) => void;
    loadWallpaper: (file: File) => void;
}

export const WallpaperContext = createContext<WallpaperContextProps | undefined>(undefined);

export const WallpaperProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [wallpaper, setWallpaper] = useState<Wallpaper>({ title: 'Wallpaper 1', src: '/wallpapers/bg.jpg' });
    const [allWallpapers, setAllWallpapers] = useState<Wallpaper[]>([ // Состояние всех обоев
        { title: 'Wallpaper 1', src: '/wallpapers/A.png' },
        { title: 'Wallpaper 3', src: '/wallpapers/AB.jpg' },
        { title: 'Wallpaper 4', src: '/wallpapers/AG.jpg' },
        { title: 'Wallpaper 5', src: '/wallpapers/AR.jpg' },
        { title: 'Wallpaper 6', src: '/wallpapers/B.png' },
        { title: 'Wallpaper 7', src: '/wallpapers/bg.jpg' }
    ]);

    const changeWallpaper = (title: string, src: string) => {
        setWallpaper({ title, src });
    };

    const loadWallpaper = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const src = reader.result as string;
            const newWallpaper = { title: file.name, src };
            setAllWallpapers(prev => [newWallpaper, ...prev]); // Добавляем новое изображение в начало
            setWallpaper(newWallpaper); // Устанавливаем новое изображение как текущее
        };
        reader.readAsDataURL(file);
    };

    return (
        <WallpaperContext.Provider value={{ wallpaper, allWallpapers, changeWallpaper, loadWallpaper }}>
            {children}
        </WallpaperContext.Provider>
    );
};