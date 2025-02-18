'use client'
import {createContext} from "react";
import { getWallpapers } from "./getWallpaper";

interface Wallpaper{
    src: string;
}


export const WallpaperContext = createContext<Wallpaper>({src: "./wallpapers/bg"});

