'use client'
import React from "react";
import { getWallpapers } from "./getWallpaper";

const wallpapers = getWallpapers();


const WallpaperContext = React.createContext({});

