'use client'
import { createContext, FC, ReactNode } from "react";

interface Wallpaper{
    title: string;
    src: string;
}
interface WallpaperListProps{
    wallpapers: Wallpaper[];    
}

export const WallpaperContext = createContext<WallpaperListProps | undefined>(undefined);
export const WallpaperProvider: FC<{ children: ReactNode }> = ({ children }) => {

    return(
        <WallpaperProvider>
            {children}
        </WallpaperProvider>
    );
}