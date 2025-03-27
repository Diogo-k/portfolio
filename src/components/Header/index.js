'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { ThemeSwitcher } from '@/components';

const navItems = [
    { name: 'Home', href: '#home', id: 'nav-home' },
    { name: 'About Me', href: '#about-me', id: 'nav-about-me' },
    { name: 'Projects', href: '#projects', id: 'nav-projects' },
    { name: 'Contact', href: '#contact', id: 'nav-contact' },
];

// Animation variants for header
const headerVariants = {
    hidden: { y: -82, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            duration: 0.5,
            delay: 1.5,
        },
    },
};

export default function Header() {
    const [hash, setHash] = useState('');
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Sync hash with URL
    useEffect(() => {
        const updateHash = () => {
            setHash(window.location.hash || '#home'); // Default to #home if no hash
        };

        updateHash();
        window.addEventListener('hashchange', updateHash);
        return () => window.removeEventListener('hashchange', updateHash);
    }, [pathname, searchParams]);

    return (
        <motion.header
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className={clsx(
                'supports-[backdrop-filter]:bg-background/60',
                'fixed z-50 flex w-full justify-around border-b-2 border-border-light p-6 backdrop-blur',
                'dark:border-b-4 dark:border-border-dark'
            )}
            role="banner"
            aria-label="Main navigation"
        >
            <nav aria-label="Primary navigation">
                <ul className="flex space-x-16">
                    {navItems.map((item) => (
                        <motion.li
                            key={item.id}
                            whileHover={{ scale: 1.05 }}
                            whileFocus={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="relative"
                        >
                            <Link
                                href={item.href}
                                className={clsx(
                                    'text-lg tracking-wide text-primary-light hover:text-primary-light/80',
                                    'dark:text-text-dark dark:hover:text-text-dark/80',
                                    'after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0',
                                    'after:bg-primary-light after:transition-all after:duration-200',
                                    'hover:after:w-full dark:after:bg-text-dark',
                                    item.href === hash && 'after:w-full'
                                )}
                                aria-current={
                                    item.href === hash ? 'page' : undefined
                                }
                            >
                                {item.name}
                            </Link>
                        </motion.li>
                    ))}
                </ul>
            </nav>
            <ThemeSwitcher />
        </motion.header>
    );
}
