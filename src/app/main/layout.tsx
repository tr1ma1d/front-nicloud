
import { WallpaperProvider } from '@/hooks/useWallpaperContext';
import './style-main.scss';

export default function RootLayout({ 
    children, 
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <WallpaperProvider>
            {children}
        </WallpaperProvider>
    );
};