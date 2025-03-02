'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { ThemeSwitcher } from '@/components';

const navItems = [
    { name: 'Home', href: '#home', katakana: 'ホーム' },
    { name: 'Experience', href: '#experience', katakana: 'エクスペリエンス' },
    { name: 'Projects', href: '#projects', katakana: 'プロジェクト' },
    { name: 'Contact', href: '#contact', katakana: 'コンタクト' },
];

export default function Header() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const [showCursor, setShowCursor] = useState(false);
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    const customLocation =
        location.hash.split('#')[1] !== 'home' && location.hash.split('#')[1];

    return (
        <header className="supports-[backdrop-filter]:bg-background/60 fixed z-50 flex w-full justify-around border-b-2 border-border-light p-6 backdrop-blur dark:border-b-4 dark:border-border-dark">
            <Link
                href="/#home"
                className="focus:none absolute left-4 top-4 px-5 py-2 text-base font-semibold tracking-wide transition-all duration-200"
            >
                <span className="overflow-hidden text-ellipsis text-nowrap text-2xl font-normal text-primary-light dark:text-text-dark">
                    ~/{customLocation}
                    {showCursor && <span className="">|</span>}
                </span>
            </Link>
            <nav className="flex space-x-16">
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        className="relative flex flex-col items-center px-8"
                    >
                        <motion.span
                            className="text-2xl font-normal tracking-wide text-primary-light transition-all dark:text-text-dark"
                            animate={{
                                opacity: hoveredIndex === index ? 0 : 1,
                            }}
                            transition={{
                                duration: 0.35,
                            }}
                        >
                            <Link href={item.href}>{item.name}</Link>
                        </motion.span>
                        <motion.span
                            className="absolute font-japanese text-2xl font-normal tracking-wide text-text-light transition-all dark:text-accent-light"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: hoveredIndex === index ? 1 : 0,
                            }}
                            transition={{
                                duration: 0.35,
                            }}
                        >
                            <Link href={item.href}>{item.katakana}</Link>
                        </motion.span>
                    </div>
                ))}
            </nav>
            <ThemeSwitcher />
        </header>
    );
}
