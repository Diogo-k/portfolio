'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

import { ThemeSwitcher, Button, Link } from '@/components';

const navItems = [
    { name: 'Home', href: '/#home', id: 'nav-home' },
    { name: 'About Me', href: '/#about-me', id: 'nav-about-me' },
    { name: 'Projects', href: '/projects', id: 'nav-projects', route: true },
    { name: 'Contact', href: '/#contact', id: 'nav-contact' },
];

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

/**
 * Header component that displays a navigation menu and a mobile menu.
 *
 * @returns {JSX.Element} The Header component
 */
export default function Header() {
    const [hash, setHash] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();

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
                delay: pathname === '/' ? 1.5 : 0.25,
            },
        },
    };

    // Sync hash with URL
    useEffect(() => {
        const updateHash = () => {
            if (window.location.pathname.split('/')[1] === '') {
                setHash(
                    window.location.hash ? `/${window.location.hash}` : '/#home'
                );
            } else if (window.location.pathname.split('/').length === 2) {
                setHash(`/${window.location.pathname.split('/')[1]}`);
            }
        };

        updateHash();
        window.addEventListener('hashchange', updateHash);
        return () => window.removeEventListener('hashchange', updateHash);
    }, [pathname, searchParams]);

    // Update hash based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map((item) => ({
                id: item.route ? item.href.slice(1) : item.href.slice(2),
                route: item.route || false,
                element: document.getElementById(
                    item.route ? item.href.slice(1) : item.href.slice(2)
                ),
            }));

            // Get the current scroll position and viewport height
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            const viewportHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            // Check if we're at the bottom of the page
            const isAtBottom =
                window.scrollY + viewportHeight >= documentHeight - 50;

            const currentSection = sections.find((section) => {
                if (!section.element) return false;

                const rect = section.element.getBoundingClientRect();
                const sectionTop = window.scrollY + rect.top;
                const sectionBottom = window.scrollY + rect.bottom;

                // If we're at the bottom and this is the last section (contact), consider it active
                if (isAtBottom && section.id === 'nav-contact') {
                    return true;
                }

                // Check if the section is in the middle of the viewport
                return (
                    scrollPosition >= sectionTop &&
                    scrollPosition <= sectionBottom
                );
            });

            if (
                currentSection &&
                currentSection.id !== hash.slice(currentSection.route ? 1 : 2)
            ) {
                window.history.replaceState(
                    null,
                    null,
                    `#${currentSection.id}`
                );
                setHash(`/#${currentSection.id}`);
            }
        };

        // Add a small debounce to prevent too many updates
        let timeoutId;
        const debouncedHandleScroll = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleScroll, 50);
        };

        window.addEventListener('scroll', debouncedHandleScroll);
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll);
            clearTimeout(timeoutId);
        };
    }, [hash]);

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

    // Handle keyboard navigation for accessibility
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isMobileMenuOpen]);

    return (
        <motion.header
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className={clsx(
                'supports-[backdrop-filter]:bg-background/60',
                'fixed z-50 flex w-full items-center justify-end border-b-2 border-border-light p-2 backdrop-blur md:justify-center md:p-6',
                'dark:border-b-4 dark:border-border-dark'
            )}
            role="banner"
            aria-label="Main navigation"
        >
            {/* Desktop Navigation */}
            <nav aria-label="Primary navigation" className="hidden md:block">
                <ul className="flex space-x-16" role="menubar">
                    {navItems.map((item) => (
                        <motion.li
                            key={item.id}
                            whileHover={{ scale: 1.05 }}
                            whileFocus={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="relative"
                            role="none"
                        >
                            <Link
                                variant="header"
                                href={item.href}
                                ariaLabel={`Navigate to ${item.name} section`}
                                ariaCurrent={
                                    item.href === hash ? 'page' : undefined
                                }
                                active={
                                    item.route
                                        ? item.href === hash.replace('#', '')
                                        : item.href === hash
                                }
                                role="menuitem"
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
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
            >
                <svg
                    className="size-8 text-primary-light dark:text-text-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    width="32"
                    height="32"
                    stroke="currentColor"
                    aria-hidden="true"
                    focusable="false"
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
                        id="mobile-menu"
                        variants={mobileMenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="mobile-menu fixed right-0 top-full z-50 w-64 rounded-bl-lg border-b-2 border-l-2 border-border-light bg-background-light/90 p-6 shadow-lg backdrop-blur-md md:hidden dark:border-border-dark dark:bg-background-dark/80"
                        aria-label="Mobile navigation menu"
                    >
                        <nav aria-label="Mobile navigation" className="flex-1">
                            <ul
                                className="flex flex-col items-center space-y-6"
                                role="menu"
                            >
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
                                        role="none"
                                    >
                                        <Link
                                            variant="header"
                                            href={item.href}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            ariaLabel={`Navigate to ${item.name} section`}
                                            ariaCurrent={
                                                item.href === hash
                                                    ? 'page'
                                                    : undefined
                                            }
                                            active={
                                                item.route
                                                    ? item.href ===
                                                      hash.replace('#', '')
                                                    : item.href === hash
                                            }
                                            role="menuitem"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                                <li role="none">
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

Header.propTypes = {};
