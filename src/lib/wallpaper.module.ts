    class Wallpaper {
        constructor(public title: string, public src: string) {}
    }

    class WallpaperManager {
        public data: Wallpaper[] = [
            new Wallpaper('Wallpaper 1', '/wallpapers/A.png'),
            new Wallpaper('Wallpaper 3', '/wallpapers/AB.jpg'),
            new Wallpaper('Wallpaper 4', '/wallpapers/AG.jpg'),
            new Wallpaper('Wallpaper 5', '/wallpapers/AR.jpg'),
            new Wallpaper('Wallpaper 6', '/wallpapers/B.png'),
            new Wallpaper('Wallpaper 7', '/wallpapers/bg.jpg')
        ];
        // Получить обои с учётом смещения и лимита
        getWallpapers(offset: number, limit: number): Wallpaper[] {
            return this.data.slice(offset, offset + limit);
        }

        // Загрузить новый обои (добавляется в начало списка)
        uploadWallpaper(title: string, src: string): void {
            this.data.unshift(new Wallpaper(title, src));
        }
        
    }

    // Экспорт экземпляра менеджера
    export const wallpaperManager = new WallpaperManager();