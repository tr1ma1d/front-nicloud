

import { CustomThemeProvider } from '@/hooks/useCustomThemeContext';
import './style-main.scss';

export default function RootLayout({ 
    children, 
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <CustomThemeProvider>
            {children}
        </CustomThemeProvider>
    );
};