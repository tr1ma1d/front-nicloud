import { getWallpapers } from "@/lib/getWallpaper";
import Image from "next/image";

export const WallpaperList = () =>{
    const wallpapers = getWallpapers();
    return(
        <div className="w-[100%] h-[100%]">
            <h1>Wallpapers</h1>
            <div>
                {wallpapers.map((wallpaper, index) => 
                    <div key={index} className="flex gap-2 m-2">
                        <Image
                            src={wallpaper.src}
                            alt={wallpaper.title}
                            width={150}
                            height={150}
                        />
                        <p>{wallpaper.title}</p>
                    </div>
                )}
            </div>
        </div>
    );
}