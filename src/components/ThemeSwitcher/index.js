'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

import { Button } from '@/components';
import { Sun, Moon } from '@/assets';

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return (
        mounted && (
            <Button
                className="absolute right-4 top-4"
                variant="ghost"
                onClick={toggleTheme}
            >
                {resolvedTheme === 'light' ? <Moon /> : <Sun />}
            </Button>
        )
    );
}
