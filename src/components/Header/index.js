'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeSwitcher, Button } from '@/components';

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

// Animation variants for mobile menu
const mobileMenuVariants = {
    closed: {
        opacity: 0,
        x: '100%',
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
    open: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
};

export default function Header() {
    const [hash, setHash] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMobileMenuOpen &&
                !event.target.closest('.mobile-menu') &&
                !event.target.closest('.mobile-menu-button')
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileMenuOpen]);

    return (
        <motion.header
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className={clsx(
                'supports-[backdrop-filter]:bg-background/60',
                'fixed z-50 flex w-full items-center justify-end border-b-2 border-border-light p-6 backdrop-blur md:justify-center',
                'dark:border-b-4 dark:border-border-dark'
            )}
            role="banner"
            aria-label="Main navigation"
        >
            {/* Desktop Navigation */}
            <nav aria-label="Primary navigation" className="hidden md:block">
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

            <div className="hidden md:block">
                <ThemeSwitcher className="absolute right-4 top-4" />
            </div>

            <Button
                aria-label="Toggle mobile menu"
                className="mobile-menu-button md:hidden"
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <svg
                    className="size-8 text-primary-light dark:text-text-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    stroke="currentColor"
                >
                    {isMobileMenuOpen ? (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    ) : (
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    )}
                </svg>
            </Button>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="mobile-menu fixed right-0 top-full z-50 w-64 rounded-bl-lg border-b-2 border-l-2 border-border-light bg-background-light/90 p-6 shadow-lg backdrop-blur-md md:hidden dark:border-border-dark dark:bg-background-dark/80"
                    >
                        <nav aria-label="Mobile navigation" className="flex-1">
                            <ul className="flex flex-col items-center space-y-6">
                                {navItems.map((item) => (
                                    <motion.li
                                        key={item.id}
                                        whileHover={{ scale: 1.05 }}
                                        whileFocus={{ scale: 1.05 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 300,
                                        }}
                                        className="relative"
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            className={clsx(
                                                'text-center text-lg tracking-wide text-primary-light hover:text-primary-light/80',
                                                'dark:text-text-dark dark:hover:text-text-dark/80',
                                                'relative inline-block after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-0',
                                                'after:-translate-x-1/2 after:bg-primary-light after:transition-all after:duration-200',
                                                'hover:after:w-full dark:after:bg-text-dark',
                                                item.href === hash &&
                                                    'after:w-full'
                                            )}
                                            aria-current={
                                                item.href === hash
                                                    ? 'page'
                                                    : undefined
                                            }
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                                <li>
                                    <ThemeSwitcher />
                                </li>
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
