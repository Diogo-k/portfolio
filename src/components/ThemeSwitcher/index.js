'use client';

import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
            document.documentElement.classList.add(storedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="absolute right-4 top-4 rounded bg-primary-light px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-accent-light dark:bg-primary-dark dark:hover:bg-accent-dark"
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}
