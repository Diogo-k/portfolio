'use client';

import { motion } from 'framer-motion';
import { Link } from '@/components';

/**
 * Footer component that displays a copyright message and a link to the humans.txt file.
 *
 * @returns {JSX.Element} The Footer component
 */
export default function Footer() {
    return (
        <footer className="bg-background border-t-2 border-border-light py-8 dark:border-t-4 dark:border-border-dark">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center space-y-8">
                    <motion.p className="text-s text-center">
                        <Link
                            href="/humans.txt"
                            isExternal
                            aria-label="View humans.txt in new tab"
                            className="mt-2 text-sm transition-colors duration-300 hover:text-primary-light dark:hover:text-primary-dark"
                        >
                            © 2025 João Diogo Paulo.
                        </Link>
                    </motion.p>
                </div>
            </div>
        </footer>
    );
}

Footer.propTypes = {};
