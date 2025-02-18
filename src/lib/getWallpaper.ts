import fs from 'fs';
import path from 'path';

export const getWallpapers = () => {
    const wallpaperDir = path.join(process.cwd(), 'public', 'wallpapers');
    const filenames = fs.readdirSync(wallpaperDir);
    return filenames.map((filename) => ({
        src: `/wallpapers/${filename}`,
    }));
}