
import { useContext } from 'react';
import './styles/message-history.scss';
import Image from 'next/image';
import { CustomThemeContext } from '@/hooks/useCustomThemeContext';
const HistoryMessage = ({username} : any) =>{
    const context = useContext(CustomThemeContext);
    if (!context) {
        throw new Error('ThemeToggle must be used within a CustomThemeProvider');
    }
    const { theme } = context;
    return (
        <div className={`history-message ${theme.title === 'light' ? "bg-[#434343] text-white" : "bg-white text-black"}`}>
            <div className="img__container">
                <Image src = "/logotype-example.svg" alt ="logo" objectFit="cover" layout="fill"/>
            </div>
            <div className="history_text flex items-center">
                <span className = "his__username">
                    {username}
                </span>
            </div>

        </div>
    );
}

export default HistoryMessage;