'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import { CherryBlossoms, Button } from '@/components';

import { RightArrow } from '@/assets';

export const INTRO_CONFIG = {
    name: 'JOÃO DIOGO PAULO',
    title: 'Frontend Developer',
    contactButton: {
        text: 'Contact me',
        href: '#contact',
        ariaLabel: 'Contact me',
    },
};

export const ANIMATION_VARIANTS = {
    letter: {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    },
    word: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    reveal: {
        hidden: { width: 0, x: 0 },
        visible: { width: '100%', x: 0 },
        exit: { width: '100%', x: '100%' },
    },
    container: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    button: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    },
};

export const ANIMATION_TIMINGS = {
    containerDelay: 1.25,
    letterDelay: 0.05,
    wordDelay: 0.2,
    revealDelay: 0.4,
};

/**
 * Intro section component that displays the main hero section with animated text and a contact button.
 * Features a beautiful cherry blossoms background and smooth text reveal animations.
 *
 * @param {Object} props - Component props
 * @param {string} [props.className] - Additional CSS classes to apply
 * @returns {JSX.Element} The Intro section component
 */
export default function Intro({ className = '' }) {
    const { name, title, contactButton } = INTRO_CONFIG;
    const [visibleWords, setVisibleWords] = useState(
        Array(title.split(' ').length).fill(true)
    );

    const handleRevealComplete = (index) => {
        setVisibleWords((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    const calculateWordDelay = (index) => {
        return (
            ANIMATION_TIMINGS.containerDelay +
            name.length * ANIMATION_TIMINGS.letterDelay +
            index * ANIMATION_TIMINGS.wordDelay
        );
    };

    return (
        <section
            id="home"
            className={`flex h-screen flex-col items-center justify-center ${className}`}
            aria-label="Introduction"
            role="banner"
        >
            {/* <CherryBlossoms /> */}
            <motion.div
                variants={ANIMATION_VARIANTS.container}
                initial="hidden"
                animate="visible"
                transition={{
                    duration: 0.5,
                    delay: ANIMATION_TIMINGS.containerDelay,
                }}
                className="mx-auto flex max-w-5xl flex-col px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
            >
                <h1 className="mb-12 flex flex-wrap" aria-label={name}>
                    {name.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            variants={ANIMATION_VARIANTS.letter}
                            initial="hidden"
                            animate="visible"
                            transition={{
                                duration: 0.3,
                                delay:
                                    ANIMATION_TIMINGS.containerDelay +
                                    index * ANIMATION_TIMINGS.letterDelay,
                            }}
                            className={`text-lg tracking-widest text-muted-light md:text-2xl dark:text-muted-dark ${
                                char === ' ' ? 'w-2' : ''
                            }`}
                            aria-hidden="true"
                        >
                            {char}
                        </motion.span>
                    ))}
                </h1>
                <h2 className="flex flex-wrap" aria-label={title}>
                    {title.split(' ').map((word, index) => (
                        <div key={index} className="relative overflow-hidden">
                            <AnimatePresence>
                                {visibleWords[index] && (
                                    <motion.div
                                        key={word}
                                        variants={ANIMATION_VARIANTS.reveal}
                                        initial="hidden"
                                        animate={{
                                            width: '100%',
                                            transition: {
                                                duration: 0.35,
                                                delay: calculateWordDelay(
                                                    index
                                                ),
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
                                        onAnimationComplete={() =>
                                            handleRevealComplete(index)
                                        }
                                        className="absolute inset-0 z-10 bg-primary-light pb-2 dark:bg-primary-dark"
                                        aria-hidden="true"
                                    />
                                )}
                            </AnimatePresence>
                            <motion.span
                                variants={ANIMATION_VARIANTS.word}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    duration: 0.5,
                                    delay:
                                        calculateWordDelay(index) +
                                        ANIMATION_TIMINGS.revealDelay,
                                }}
                                className="relative text-7xl font-bold md:text-9xl"
                                aria-hidden="true"
                            >
                                {word}
                            </motion.span>
                        </div>
                    ))}
                </h2>
                <motion.div
                    variants={ANIMATION_VARIANTS.button}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.5,
                        delay: calculateWordDelay(title.split(' ').length - 1),
                    }}
                    className="pt-3 md:pt-6"
                >
                    <Button
                        variant="primary"
                        size="md"
                        as="link"
                        href={contactButton.href}
                        aria-label={contactButton.ariaLabel}
                    >
                        {contactButton.text}
                        <RightArrow
                            className="ml-1 size-4"
                            aria-hidden="true"
                        />
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}

Intro.propTypes = {
    className: PropTypes.string,
};
