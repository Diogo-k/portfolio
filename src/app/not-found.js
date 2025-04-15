'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { Button, Link, Text } from '@/components';

export default function NotFound() {
    const [isHovered, setIsHovered] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const numberVariants = {
        hover: {
            scale: 1.1,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-4 max-w-2xl text-center"
            >
                <motion.div variants={itemVariants} className="relative">
                    <motion.div
                        variants={numberVariants}
                        animate={'hover'}
                        whileHover="hover"
                        onHoverStart={() => setIsHovered(true)}
                        onHoverEnd={() => setIsHovered(false)}
                        className="cursor-pointer"
                    >
                        <Text
                            as="h1"
                            size="text-9xl"
                            weight="font-bold"
                            className="bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-transparent dark:from-primary-dark dark:to-accent-dark"
                        >
                            404
                        </Text>
                    </motion.div>

                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute -right-4 -top-4 rounded-full bg-accent-light p-2 text-sm text-white dark:bg-accent-dark"
                        >
                            Oops!
                        </motion.div>
                    )}
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Text
                        as="h2"
                        size="text-2xl"
                        weight="font-semibold"
                        className="mb-6 text-text-light dark:text-text-dark"
                    >
                        Looks like you&apos;ve ventured into the void
                    </Text>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Text
                        as="h3"
                        size="text-lg"
                        className="mt-6 text-muted-light dark:text-muted-dark"
                    >
                        This page could not be found. It either doesn&apos;t
                        exist or was deleted.
                        <br />
                        Or perhaps you don&apos;t exist and this webpage
                        couldn&apos;t find you.
                    </Text>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
                >
                    <Button
                        as="link"
                        href="/"
                        variant="primary"
                        size="lg"
                        className="group"
                    >
                        Take Me Home
                        <span className="ml-2 transition-transform group-hover:rotate-12">
                            🏠
                        </span>
                    </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-12">
                    <Text
                        as="p"
                        size="text-sm"
                        className="text-muted-light dark:text-muted-dark"
                    >
                        Need help? <Link href="/#contact">Contact us</Link>
                    </Text>
                </motion.div>
            </motion.div>
        </div>
    );
}
