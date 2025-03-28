'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';

export default function Footer() {
    return (
        <footer className="bg-background border-t-2 border-border-light py-8 dark:border-t-4 dark:border-border-dark">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center space-y-8">
                    <motion.p className="text-center text-sm text-text-light dark:text-text-dark">
                        © 2025 Diogo Paulo.{' '}
                        <Link
                            href="https://github.com/Diogo-k"
                            className={clsx(
                                'relative text-primary-light hover:text-primary-light/80 dark:text-text-dark dark:hover:text-text-dark/80',
                                'after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary-light after:transition-all after:duration-200 hover:after:w-full dark:after:bg-text-dark'
                            )}
                        >
                            Crafted by yours truly
                        </Link>
                    </motion.p>
                </div>
            </div>
        </footer>
    );
}
