'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Text, ThemeSwitcher } from '@/components';

const navItems = [
    { name: 'Home', href: '', katakana: 'ホーム' },
    { name: 'Experience', href: '#experience', katakana: 'エクスペリエンス' },
    { name: 'Projects', href: '#work', katakana: 'プロジェクト' },
    { name: 'Contact', href: '#contact', katakana: 'コンタクト' },
];

export default function Header() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed z-10 flex w-full items-center justify-around px-6 py-9"
        >
            <motion.nav className="flex space-x-16">
                {navItems.map((item, index) => (
                    <motion.div
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
                            className="absolute font-japanese text-2xl font-normal tracking-wide text-text-light transition-all dark:text-primary-light"
                            animate={{
                                opacity: hoveredIndex === index ? 1 : 0,
                            }}
                            transition={{
                                duration: 0.35,
                            }}
                        >
                            <Link href={item.href}>{item.katakana}</Link>
                        </motion.span>
                    </motion.div>
                ))}
            </motion.nav>
            <ThemeSwitcher />
        </motion.header>
    );
}
