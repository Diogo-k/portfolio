'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
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

    const [hash, setHash] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        const updateHash = () => {
            setHash(window.location.hash);
        };

        updateHash();

        window.addEventListener('hashChange', updateHash);

        return () => {
            window.removeEventListener('hashChange', updateHash);
        };
    }, [searchParams]);

    const [showCursor, setShowCursor] = useState(false);
    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <header className="supports-[backdrop-filter]:bg-background/60 fixed z-50 flex w-full justify-around border-b-2 border-border-light p-6 backdrop-blur dark:border-b-4 dark:border-border-dark">
            <Link
                href="/#home"
                className="focus:none absolute left-4 top-4 px-5 py-2 tracking-wide"
            >
                <span className="text-ellipsis text-nowrap text-2xl text-primary-light dark:text-text-dark">
                    ~/{hash !== '#home' && hash?.split('#')[1]}
                    {showCursor && <span>|</span>}
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
                            className={clsx(
                                'after:transition-width text-2xl tracking-wide text-primary-light after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-primary-light after:duration-200 hover:after:w-full dark:text-text-dark dark:after:bg-text-dark',
                                item.href === hash && 'after:w-full'
                            )}
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
                            className={clsx(
                                'after:transition-width absolute font-japanese text-2xl tracking-wide text-text-light after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-text-light after:duration-200 hover:after:w-full dark:text-accent-light dark:after:bg-accent-light',
                                item.href === hash && 'after:w-full'
                            )}
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
