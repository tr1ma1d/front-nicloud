
export const getWallpapers = () => {
    return wallpaper.data;
}   
export const uploadWallpaper = (wallpaperTitle: string, wallpaperSrc: string) => {
    wallpaper.data.unshift({ title: wallpaperTitle, src: wallpaperSrc });
}


let wallpaper = {
    data:
        [
            {
                title: 'Wallpaper 1',
                src: '/wallpapers/A.png'
            },
            {
                title: 'Wallpaper 3',
                src: '/wallpapers/Dragon Red.jpg'
            },
            {
                title: 'Wallpaper 4',
                src: '/wallpapers/Ocean Blue.jpg'
            },
            {
                title: 'Wallpaper 5',
                src: '/wallpapers/River Blue.jpg'
            },
            {
                title: 'Wallpaper 6',
                src: '/wallpapers/A - Purple.png'
            }
        ]

};