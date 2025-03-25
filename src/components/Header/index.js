'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { ThemeSwitcher } from '@/components';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

export default function Header() {
    const [hash, setHash] = useState('');
    const searchParams = useSearchParams();

    useEffect(() => {
        const updateHash = () => {
            setHash(window.location.hash);
        };

        updateHash();
        window.addEventListener('hashChange', updateHash);
        return () => window.removeEventListener('hashChange', updateHash);
    }, [searchParams]);

    return (
        <motion.header
            initial={{ y: -82, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                duration: 0.5,
                delay: 1.5,
            }}
            className="supports-[backdrop-filter]:bg-background/60 fixed z-50 flex w-full justify-around border-b-2 border-border-light p-6 backdrop-blur dark:border-b-4 dark:border-border-dark"
        >
            <nav className="flex space-x-16">
                {navItems.map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                    >
                        <Link
                            href={item.href}
                            className={clsx(
                                'text-lg tracking-wide text-primary-light hover:text-primary-light/80 dark:text-text-dark dark:hover:text-text-dark/80',
                                'after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary-light after:transition-all after:duration-200 hover:after:w-full dark:after:bg-text-dark',
                                item.href === hash && 'after:w-full'
                            )}
                        >
                            {item.name}
                        </Link>
                    </motion.div>
                ))}
            </nav>
            <ThemeSwitcher />
        </motion.header>
    );
}
