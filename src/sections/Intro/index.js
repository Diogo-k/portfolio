'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { CherryBlossoms, Button } from '@/components';

import { RightArrow } from '@/assets';

const letterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
};

const wordVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const revealVariants = {
    hidden: { width: 0, x: 0 },
    visible: { width: '100%', x: 0 },
    exit: { width: '100%', x: '100%' },
};

export default function Intro() {
    const name = 'DIOGO PAULO';
    const title = 'Frontend Developer';

    const [visibleWords, setVisibleWords] = useState(
        Array(title.split(' ').length).fill(true)
    );

    return (
        <section
            id="home"
            className="flex h-screen flex-col items-center justify-center"
        >
            <CherryBlossoms />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.25 }}
                className="z-10 mx-auto max-w-5xl pb-14 md:py-36"
            >
                <div className="mb-12 flex flex-wrap">
                    {name.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                duration: 0.3,
                                delay: 1.25 + index * 0.05,
                            }}
                            className={`font-sora text-2xl tracking-widest text-muted-light dark:text-muted-dark ${
                                char === ' ' ? 'w-2' : ''
                            }`}
                        >
                            {char}
                        </motion.span>
                    ))}
                </div>
                <div className="flex flex-wrap">
                    {title.split(' ').map((word, index) => (
                        <div key={index} className="relative overflow-hidden">
                            <AnimatePresence>
                                {visibleWords[index] && (
                                    <motion.div
                                        key={word}
                                        variants={revealVariants}
                                        initial="hidden"
                                        animate={{
                                            width: '100%',
                                            transition: {
                                                duration: 0.35,
                                                delay:
                                                    1 +
                                                    name.length * 0.05 +
                                                    index * 0.2,
                                            },
                                        }}
                                        exit={{
                                            width: '100%',
                                            x: '100%',
                                            transition: {
                                                duration: 0.3,
                                                delay: 0.25,
                                            },
                                        }}
                                        onAnimationComplete={() => {
                                            setVisibleWords((prev) => {
                                                const newState = [...prev];
                                                newState[index] = false;
                                                return newState;
                                            });
                                        }}
                                        className="absolute inset-0 z-10 bg-primary-light pb-2 dark:bg-primary-dark"
                                    />
                                )}
                            </AnimatePresence>
                            <motion.span
                                variants={wordVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    duration: 0.5,
                                    delay:
                                        1 +
                                        name.length * 0.05 +
                                        index * 0.2 +
                                        0.4,
                                }}
                                className="relative text-4xl font-bold md:text-9xl"
                            >
                                {word}
                            </motion.span>
                        </div>
                    ))}
                </div>
                <motion.div
                    className="pt-3 md:pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay:
                            1.25 +
                            name.length * 0.05 +
                            title.split(' ').length * 0.2,
                    }}
                >
                    <Button
                        variant="primary"
                        size="md"
                        as="link"
                        href="#contact"
                        aria-label="Contact me"
                    >
                        Contact me
                        <RightArrow className="ml-1 size-4" />
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}
