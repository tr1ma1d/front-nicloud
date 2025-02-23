import { WallpaperItem } from "@/components/WallpaperItem";
import { WallpaperContext } from "@/hooks/useWallpaperContext";
import { wallpaperManager } from "@/lib/wallpaper.module";


import { useContext, useEffect, useState } from "react";
type Wallpaper = {
    title: string;
    src: string;
}
export const WallpaperList = () => {
    const [offset, setOffset] = useState(0);
    const limit = 4;
    const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);

    const context = useContext(WallpaperContext);
    if (!context) {
        throw new Error('WallpaperContext must be used within a WallpaperProvider');
    }
    const { changeWallpaper } = context;

    useEffect(() => {
        setWallpapers(wallpaperManager.getWallpapers(offset, limit));
    }, [offset, limit]);

    const nextPage = () => {
        if (offset + limit < wallpaperManager.data.length) {
            setOffset((prev) => prev + limit);
        }
    };

    const prevPage = () => {
        if (offset > 0) {
            setOffset((prev) => Math.max(0, prev - limit));
        }
    };

    return (
        <div className="w-full h-full p-8">
            <h1 className="text-xl font-bold mb-4">Wallpapers</h1>
            <div className="flex flex-wrap gap-4 justify-evenly">
                {wallpapers.map((wallpaper) => (
                    <WallpaperItem
                        key={wallpaper.title}
                        {...{
                            wallpaper,
                            changeWallpaper // Если переменная доступна в этой области видимости
                        }}
                    />
                ))}

            </div>
            <div className="flex justify-between p-2">
                <button className="prev-btn" 
                    onClick={prevPage} 
                    disabled={offset === 0}>←</button>
                <button className="next-btn" 
                    onClick={nextPage} 
                    disabled={offset + limit >= wallpaperManager.data.length}>→</button>
            </div>
        </div>
    );
};
