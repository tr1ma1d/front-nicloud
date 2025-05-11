'use client';
import { createContext, FC, ReactNode, useEffect, useState } from "react";

interface CustomThemeContext {
    wallpaper: Wallpaper;
    theme: Theme;
    allWallpapers: Wallpaper[];
    changeTheme: (title: 'light' | 'dark') => void;
    changeWallpaper: (title: string, src: string) => void;
    loadWallpaper: (file: File) => void;
}

export const CustomThemeContext = createContext<CustomThemeContext | undefined>(undefined);

export const CustomThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [wallpaper, setWallpaper] = useState<Wallpaper>({ title: 'Wallpaper 1', src: '/wallpapers/bg.jpg' });
    const [theme, setTheme] = useState<Theme>({ title: 'light' });
    const [allWallpapers, setAllWallpapers] = useState<Wallpaper[]>([ // Состояние всех обоев
        { title: 'Wallpaper 1', src: '/wallpapers/A.png' },
        { title: 'Wallpaper 3', src: '/wallpapers/AB.jpg' },
        { title: 'Wallpaper 4', src: '/wallpapers/AG.jpg' },
        { title: 'Wallpaper 5', src: '/wallpapers/AR.jpg' },
        { title: 'Wallpaper 6', src: '/wallpapers/B.png' },
        { title: 'Wallpaper 7', src: '/wallpapers/bg.jpg' }
    ]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light' || savedTheme === 'dark') {
                setTheme({ title: savedTheme });
            }
        }
    }, []);
    const changeTheme = (title: 'light' | 'dark') => {
        localStorage.setItem('theme', title);
        setTheme({ title });
    }

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
        <CustomThemeContext.Provider value={{ wallpaper, theme, allWallpapers, changeTheme, changeWallpaper, loadWallpaper }}>
            {children}
        </CustomThemeContext.Provider>
    );
};