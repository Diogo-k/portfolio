'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components';
import { Sun, Moon } from '@/assets';

/**
 * ThemeSwitcher component that displays a button to toggle the theme.
 *
 * @param {Object} props - The component props
 * @returns {React.ReactNode} The rendered component
 */
const ThemeSwitcher = ({ ...props }) => {
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
                aria-label="Toggle theme"
                variant="ghost"
                onClick={toggleTheme}
                {...props}
            >
                {resolvedTheme === 'light' ? <Moon /> : <Sun />}
            </Button>
        )
    );
};

export default ThemeSwitcher;
