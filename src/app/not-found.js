'use client';

import { motion } from 'motion/react';
import { Text, Button, Link } from '@/components';
import { FADE_IN, FADE_IN_SLIDE_UP } from '@/constants/animations';

/**
 * NotFound component
 *
 * @returns {React.ReactNode} The rendered component
 */
export default function NotFound() {
    const NUMBER_TAP = {
        tap: {
            scale: [1, 1.1, 0.95, 1],
            rotate: [0, -10, 10, -5, 2, 0],
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                type: 'tween',
            },
        },
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={FADE_IN}
                transition={{
                    ...FADE_IN.transition,
                }}
                className="mb-4 max-w-2xl text-center"
            >
                <motion.div className="relative">
                    <motion.div
                        variants={NUMBER_TAP}
                        animate={'tap'}
                        whileTap="tap"
                        className="cursor-pointer"
                    >
                        <h1 className="bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-9xl font-bold text-transparent dark:from-primary-dark dark:to-accent-dark">
                            404
                        </h1>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={FADE_IN_SLIDE_UP}
                    transition={{
                        ...FADE_IN_SLIDE_UP.transition,
                        delay: 0.2,
                    }}
                >
                    <Text
                        as="h2"
                        size="text-2xl"
                        weight="font-semibold"
                        align="center"
                        className="mb-6"
                    >
                        Looks like you&apos;ve ventured into the void
                    </Text>
                </motion.div>

                <motion.div
                    variants={FADE_IN_SLIDE_UP}
                    transition={{
                        ...FADE_IN_SLIDE_UP.transition,
                        delay: 0.4,
                    }}
                >
                    <Text
                        as="h3"
                        size="text-lg"
                        align="center"
                        className="mt-6"
                    >
                        This page could not be found. It either doesn&apos;t
                        exist or was deleted.
                        <br />
                        Or perhaps you don&apos;t exist and this webpage
                        couldn&apos;t find you.
                    </Text>
                </motion.div>

                <motion.div
                    variants={FADE_IN_SLIDE_UP}
                    transition={{
                        ...FADE_IN_SLIDE_UP.transition,
                        delay: 0.6,
                    }}
                    className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
                >
                    <Button
                        as="link"
                        href="/"
                        variant="primary"
                        size="lg"
                        className="group w-fit"
                    >
                        Take Me Home
                        <span className="ml-2 transition-transform group-hover:rotate-12">
                            🏠
                        </span>
                    </Button>
                </motion.div>

                <motion.div
                    variants={FADE_IN_SLIDE_UP}
                    transition={{
                        ...FADE_IN_SLIDE_UP.transition,
                        delay: 0.8,
                    }}
                    className="mt-12"
                >
                    <Text as="p" size="text-sm" align="center">
                        Need help? <Link href="/#contact">Contact me</Link>
                    </Text>
                </motion.div>
            </motion.div>
        </div>
    );
}
