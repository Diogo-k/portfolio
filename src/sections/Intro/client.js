'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';

import { motion, AnimatePresence } from 'motion/react';

import { Button } from '@/components';

import { ANIMATION_VARIANTS, ANIMATION_TIMINGS } from './animation';

/**
 * Intro section component that displays the main hero section with animated text and a cta button.
 * Features a beautiful cherry blossoms background and smooth text reveal animations.
 *
 * @param {Object} props - Component props
 * @param {Object} props.intro - Intro data
 * @returns {JSX.Element} The Intro section component
 */
export default function Intro({ intro }) {
    const { name, title, button } = intro;

    const [visibleWords, setVisibleWords] = useState(
        Array(title.split(' ').length).fill(true)
    );

    const calculateWordDelay = (index) => {
        return (
            ANIMATION_TIMINGS.containerDelay +
            name.length * ANIMATION_TIMINGS.letterDelay +
            index * ANIMATION_TIMINGS.wordDelay
        );
    };

    const handleRevealComplete = (index) => {
        setVisibleWords((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    return (
        <section
            id="home"
            className={`flex h-screen flex-col items-center justify-center`}
            aria-label="Introduction"
            role="banner"
        >
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
                <h1 className="mb-6 flex flex-wrap md:mb-12" aria-label={name}>
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
                                className="relative text-6xl font-bold md:text-8xl lg:text-9xl"
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
                    className="mt-6 md:mt-12"
                >
                    <Button
                        variant="primary"
                        size="md"
                        as="link"
                        href={button.href}
                        aria-label={button.ariaLabel}
                    >
                        {button.text}
                    </Button>
                </motion.div>
            </motion.div>
        </section>
    );
}

Intro.propTypes = {
    intro: PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        button: PropTypes.shape({
            text: PropTypes.string.isRequired,
            href: PropTypes.string.isRequired,
            ariaLabel: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};
