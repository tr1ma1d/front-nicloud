'use client';
import { CustomThemeContext } from "@/hooks/useCustomThemeContext";
import { useContext, useEffect } from "react";

export const ThemeToggle = () => {
    const context = useContext(CustomThemeContext);
    if (!context) {
        throw new Error('ThemeToggle must be used within a CustomThemeProvider');
    }
    const { theme, changeTheme } = context;

    useEffect(() => {
        console.log("Theme changed to:", theme.title);
    }, [theme.title]);

    const toggleTheme = () => {
        changeTheme(theme.title === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={`relative inline-flex items-center h-10 rounded-full w-24 backdrop-blur-2 duration-700
            ${theme.title === 'light' ? 'bg-gray-200' : 'bg-[#120a3d]'}`}
        >
            <div
                className={`absolute top-0 h-full w-1/2 rounded-full
                  bg-white dark:bg-white/50 shadow-md transform 
                  transition-transform duration-300 
                  ${theme.title === 'light' ? 'translate-x-0' : 'translate-x-full'}`}
                aria-hidden="true"
            />
            <button
                onClick={toggleTheme}
                className={`absolute top-0 left-0 h-full w-1/2 rounded-l-full flex items-center justify-center transition-all duration-300 
                    ${theme.title === 'light'
                        ? ''
                        : 'bg-transparent text-gray-700 dark:text-gray-300'
                    }`}
            >
                ☀️
            </button>

            <button
                onClick={toggleTheme}
                className={`absolute top-0 right-0 h-full w-1/2 rounded-r-full flex items-center justify-center transition-all duration-300 ${theme.title === 'dark'
                    ? ''
                    : 'bg-transparent text-gray-700 dark:text-gray-300'
                    }`}
            >
                🌑
            </button>

        </div>
    );
};