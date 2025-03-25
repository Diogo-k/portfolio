'use client';

import { motion } from 'framer-motion';

const socialLinks = [
    {
        name: 'GitHub',
        href: 'https://github.com/yourusername',
        icon: '🐙',
    },
    {
        name: 'LinkedIn',
        href: 'https://linkedin.com/in/yourusername',
        icon: '💼',
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/yourusername',
        icon: '🐦',
    },
];

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-background border-t-2 border-border-light py-12 dark:border-t-4 dark:border-border-dark"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center space-y-8">
                    <div className="flex space-x-6">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-2xl text-primary-light transition-colors hover:text-primary-light/80 dark:text-text-dark dark:hover:text-text-dark/80"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-center text-sm text-primary-light/70 dark:text-text-dark/70"
                    >
                        © 2025 João Diogo Paulo. Crafted by yours truly
                    </motion.p>
                </div>
            </div>
        </motion.footer>
    );
}
