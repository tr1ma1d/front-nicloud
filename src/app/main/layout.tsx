
import './style-main.scss';

export default function RootLayout({ 
    children, 
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            {children}
        </div>
    );
};