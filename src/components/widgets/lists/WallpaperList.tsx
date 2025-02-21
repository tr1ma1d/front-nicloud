import { WallpaperContext } from "@/hooks/useWallpaperContext";
import { wallpaperManager } from "@/lib/wallpaper.module";

import Image from "next/image";
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
        <div className="w-full h-full p-5">
            <h1 className="text-xl font-bold mb-4">Wallpapers</h1>
            <div className="flex flex-wrap gap-4">
                {wallpapers.map((wallpaper) => (
                    <div 
                        key={wallpaper.src} 
                        className="flex flex-col items-center cursor-pointer w-[150px] hover:bg-gray-100 p-2 rounded"
                        onClick={() => changeWallpaper(wallpaper.title, wallpaper.src)}
                    >
                        <Image
                            src={wallpaper.src}
                            alt={wallpaper.title}
                            width={150}
                            height={150}
                            className="rounded"
                        />
                        <p className="mt-2 text-sm">{wallpaper.title}</p>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button className="prev-btn" onClick={prevPage} disabled={offset === 0}>Prev</button>
                <button className="next-btn" onClick={nextPage} disabled={offset + limit >= wallpaperManager.data.length}>Next</button>
            </div>
        </div>
    );
};
