'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components';
import { Sun, Moon } from '@/assets';

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
        <Button
            className="absolute right-4 top-4"
            variant="ghost"
            onClick={toggleTheme}
        >
            {theme === 'light' ? <Moon /> : <Sun />}
        </Button>
    );
}
