'use client';

import { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { motion, AnimatePresence } from 'motion/react';

import { CherryBlossoms, Link } from '@/components';

import { ANIMATION_VARIANTS, ANIMATION_TIMINGS } from './animation';

/**
 * Intro section component that displays the main hero section with animated text and a range slider to control the speed of the flying petals.
 * Features a beautiful cherry blossoms background and smooth text reveal animations.
 *
 * @param {Object} props - Component props
 * @param {Object} props.intro - Intro data
 * @returns {JSX.Element} The Intro section component
 */
export default function Intro({ intro }) {
    const { name, title } = intro;

    const [isIntroCrossedCenter, setIsIntroCrossedCenter] = useState(false);

    const [flyingSpeed, setFlyingSpeed] = useState(0.02);

    const handleSpeedChange = (e) => {
        setFlyingSpeed(parseFloat(e.target.value));
    };

    const [visibleWords, setVisibleWords] = useState(
        Array(title.split(' ').length).fill(true)
    );

    const calculateWordDelay = useCallback(
        (index) => {
            return (
                ANIMATION_TIMINGS.containerDelay +
                name.length * ANIMATION_TIMINGS.letterDelay +
                index * ANIMATION_TIMINGS.wordDelay
            );
        },
        [name.length]
    );

    const handleRevealComplete = useCallback((index) => {
        setVisibleWords((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    }, []);

    const nameLetters = useMemo(() => name.split(''), [name]);
    const titleWords = useMemo(() => title.split(' '), [title]);

    return (
        <section
            id="home"
            className={`mx-auto flex h-screen max-w-5xl flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:items-start lg:py-28`}
            aria-label="Introduction"
            role="banner"
        >
            <CherryBlossoms
                isIntroCrossedCenter={isIntroCrossedCenter}
                setIsIntroCrossedCenter={setIsIntroCrossedCenter}
                flyingSpeed={flyingSpeed}
            />

            {isIntroCrossedCenter && (
                <motion.div
                    variants={ANIMATION_VARIANTS.container}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        duration: 0.5,
                        delay: ANIMATION_TIMINGS.containerDelay,
                    }}
                    className="z-10"
                >
                    <h1
                        className="mb-6 flex flex-wrap md:mb-12"
                        aria-label={name}
                    >
                        {nameLetters.map((char, index) => (
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

                    <h2 className="relative flex flex-col" aria-label={title}>
                        {titleWords.map((word, index) => (
                            <div
                                key={index}
                                className="relative w-fit overflow-hidden"
                            >
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
                                    className="relative text-6xl font-bold md:text-7xl lg:text-8xl"
                                    aria-hidden="true"
                                >
                                    {word}
                                </motion.span>
                            </div>
                        ))}
                    </h2>

                    <motion.div
                        variants={ANIMATION_VARIANTS.rangeSlider}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            duration: 0.5,
                            delay: calculateWordDelay(titleWords.length) + 0.7,
                        }}
                        className="mt-6 flex w-full"
                    >
                        <div className="relative w-full max-w-xs">
                            <div className="mb-2 flex justify-between">
                                <span className="text-xs text-muted-light dark:text-muted-dark">
                                    Slow
                                </span>
                                <span className="text-xs text-muted-light dark:text-muted-dark">
                                    Fast
                                </span>
                            </div>
                            <div className="relative w-full">
                                <div className="relative">
                                    <div className="relative h-2 w-full">
                                        <div className="absolute h-2 w-full rounded bg-surface-light dark:bg-surface-dark" />
                                        <div
                                            className="absolute h-2 rounded bg-primary-light dark:bg-primary-dark"
                                            style={{
                                                width: `${((flyingSpeed - 0.01) / (0.1 - 0.01)) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <input
                                        type="range"
                                        min="0.010"
                                        max="0.1"
                                        step="0.010"
                                        value={flyingSpeed}
                                        onChange={handleSpeedChange}
                                        className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent accent-text-light focus:outline-none dark:accent-text-dark"
                                        aria-label="Flying petals speed control"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <Link
                        variant={false}
                        href="#about-me"
                        className="group absolute bottom-10 right-1/2 z-10 flex h-[36px] w-[26px] justify-center rounded-full border-2 border-muted-light/60 p-1 hover:border-primary-light dark:border-muted-dark/60 dark:hover:border-primary-dark"
                        aria-label="Scroll to about me"
                    >
                        <motion.div
                            animate={{
                                y: [0, 0, 8],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                times: [0, 0.2, 1],
                                duration: 2,
                                ease: 'easeInOut',
                                repeat: Infinity,
                            }}
                            className="h-[7px] w-[2px] bg-muted-light/60 group-hover:bg-primary-light dark:bg-muted-dark/60 dark:group-hover:bg-primary-dark"
                        />
                        <span className="sr-only" aria-hidden="true">
                            Scrolls to about me section
                        </span>
                    </Link>
                </motion.div>
            )}
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
