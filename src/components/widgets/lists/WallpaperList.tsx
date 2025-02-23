import { useContext, useState } from "react";
import { WallpaperContext } from "@/hooks/useWallpaperContext";
import { WallpaperItem } from "@/components/WallpaperItem";
import { UploadPaper } from "./UploadPaper";

export const WallpaperList = () => {
    const [offset, setOffset] = useState(0);
    const limit = 3;

    const context = useContext(WallpaperContext);
    if (!context) {
        throw new Error('WallpaperContext must be used within a WallpaperProvider');
    }
    const { allWallpapers, changeWallpaper, loadWallpaper } = context;

    const currentWallpapers = allWallpapers.slice(offset, offset + limit);

    const nextPage = () => {
        if (offset + limit < allWallpapers.length) {
            setOffset(prev => prev + limit);
        }
    };

    const prevPage = () => {
        if (offset > 0) {
            setOffset(prev => Math.max(0, prev - limit));
        }
    };

    return (
        <div className="w-full h-full p-8">
            <h1 className="text-xl font-bold mb-4">Wallpapers</h1>
            <div className="flex flex-wrap gap-4 justify-evenly">
                <UploadPaper loadWallpaper={loadWallpaper} />
                {currentWallpapers.map((wallpaper) => (
                    <WallpaperItem
                        key={wallpaper.title}
                        wallpaper={wallpaper}
                        changeWallpaper={changeWallpaper}
                    />
                ))}
            </div>
            <div className="flex justify-between p-2">
                <button
                    onClick={prevPage}
                    disabled={offset === 0}
                >
                    ←
                </button>
                <button
                    onClick={nextPage}
                    disabled={offset + limit >= allWallpapers.length}
                >
                    →
                </button>
            </div>
        </div>
    );
};