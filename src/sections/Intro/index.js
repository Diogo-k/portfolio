'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'motion/react';
import { useDetectGPU } from '@react-three/drei';
import { Loading, Link } from '@/components';
import {
    bezierFastoutSlowin,
    FADE_IN,
    FADE_IN_SLIDE_DOWN,
    FADE_IN_SLIDE_UP,
} from '@/constants/animations';
import config from '@/config';

const CherryBlossoms = dynamic(
    () => import('../../components/CherryBlossoms'),
    {
        ssr: false,
        loading: () => <Loading />,
    }
);

/**
 * Intro section component that displays the main hero section with animated text and a range slider to control the speed of the flying petals.
 * Features a cherry blossoms background and smooth text reveal animations.
 *
 * @returns {JSX.Element} The Intro section component
 */
export default function Intro() {
    const gpu = useDetectGPU(); // TODO: Find another way to handle useDetectGPU on the client side without causing hydration errors
    const [isClient, setIsClient] = useState(false); //* Temporary solution to prevent useDetectGPU from causing hydration errors

    const { name, role } = config;

    const introSectionRef = useRef(null);

    const [isIntroCrossedCenter, setIsIntroCrossedCenter] = useState(false);
    const [isIntroVisible, setIsIntroVisible] = useState(false);

    const [flyingSpeed, setFlyingSpeed] = useState(0.02);

    const handleSpeedChange = (e) => {
        setFlyingSpeed(parseFloat(e.target.value));
    };

    const [hiddenWord, setHiddenWord] = useState(
        Array(role.split(' ').length).fill(true)
    );

    const handleRevealComplete = useCallback((index) => {
        setHiddenWord((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    }, []);

    useEffect(() => {
        console.info(
            `${config.ascii}\n\n`,
            `Taking a peek? Check out the source code: ${config.repo}\n\n`
        );
        setIsClient(true);
    }, []);

    useEffect(() => {
        const introSection = introSectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntroVisible(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (introSection) {
            observer.observe(introSection);
        }

        return () => {
            if (introSection) {
                observer.unobserve(introSection);
            }
        };
    }, []);

    const nameLettersDelay = name.length * 0.05;

    const shouldRenderIntro = isIntroCrossedCenter;
    const shouldRenderScrollIndicator = isIntroCrossedCenter && isIntroVisible;

    return (
        <section
            ref={introSectionRef}
            id="home"
            className={`mx-auto flex h-screen max-w-5xl flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:items-start lg:py-28`}
            aria-label="Introduction"
            role="banner"
        >
            <CherryBlossoms
                isIntroCrossedCenter={isIntroCrossedCenter}
                setIsIntroCrossedCenter={setIsIntroCrossedCenter}
                flyingSpeed={flyingSpeed}
                gpu={isClient && gpu}
            />

            {shouldRenderIntro && (
                <motion.div
                    variants={FADE_IN}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        ...FADE_IN.transition,
                    }}
                    className="z-10"
                >
                    <h1
                        className="mb-6 flex flex-wrap text-lg tracking-widest text-muted-light md:mb-12 md:text-2xl dark:text-muted-dark"
                        aria-label={name}
                    >
                        {config.name.split('').map((char, index) => (
                            <motion.span
                                key={index}
                                variants={FADE_IN_SLIDE_DOWN}
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    ...FADE_IN_SLIDE_DOWN.transition,
                                    duration: 0.3,
                                    delay: index * 0.05,
                                }}
                                className={`${char === ' ' ? 'w-2' : ''}`}
                                aria-hidden="true"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </h1>

                    <h2 className="relative flex flex-col" aria-label={role}>
                        {config.role.split(' ').map((word, index) => (
                            <div
                                key={index}
                                className="relative w-fit overflow-hidden"
                            >
                                <AnimatePresence>
                                    {hiddenWord[index] && (
                                        <motion.div
                                            key={word}
                                            initial={{ width: 0, x: 0 }}
                                            animate={{
                                                width: '100%',
                                                transition: {
                                                    ease: bezierFastoutSlowin,
                                                    duration: 0.75,
                                                    delay:
                                                        index === 0
                                                            ? nameLettersDelay
                                                            : nameLettersDelay +
                                                              0.5,
                                                },
                                            }}
                                            exit={{
                                                width: '100%',
                                                x: '100%',
                                                transition: {
                                                    duration: 0.5,
                                                    delay: 0.5,
                                                },
                                            }}
                                            onAnimationComplete={() =>
                                                handleRevealComplete(index)
                                            }
                                            className="absolute inset-0 z-10 bg-primary-light pb-2 dark:bg-primary-dark"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <motion.span
                                        variants={FADE_IN}
                                        initial="hidden"
                                        animate="visible"
                                        transition={{
                                            ...FADE_IN.transition,
                                            delay: nameLettersDelay + 1.25,
                                        }}
                                        className="relative text-6xl font-bold md:text-7xl lg:text-8xl"
                                        aria-hidden="true"
                                    >
                                        {word}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        ))}
                    </h2>

                    <motion.div
                        variants={FADE_IN_SLIDE_UP}
                        initial="hidden"
                        animate="visible"
                        transition={{
                            ...FADE_IN_SLIDE_UP.transition,
                            delay: nameLettersDelay + 2.25,
                        }}
                        className="mt-6 flex w-full"
                    >
                        <div className="relative w-full max-w-xs">
                            <div className="mb-2 flex justify-between">
                                <span className="text-xs text-muted-light dark:text-muted-dark">
                                    Slow
                                </span>
                                <span className="animate-bounce text-xs text-muted-light dark:text-muted-dark">
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
                                                width: `${((flyingSpeed - 0) / (0.1 - 0)) * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="0.1"
                                        step="0.01"
                                        value={flyingSpeed}
                                        onChange={handleSpeedChange}
                                        className="absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent accent-text-light focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-light dark:accent-text-dark dark:focus-visible:outline-text-dark"
                                        aria-label="Flying petals speed control"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {shouldRenderScrollIndicator && (
                <motion.div
                    variants={FADE_IN}
                    initial="hidden"
                    animate="visible"
                    transition={{
                        ...FADE_IN.transition,
                        duration: 0.6,
                        delay: nameLettersDelay + 2.25,
                    }}
                    className="absolute bottom-10 z-10 md:left-1/2"
                >
                    <Link
                        variant={false}
                        href="#about-me"
                        className="group hidden h-[36px] w-[26px] justify-center rounded-full border-2 border-muted-light/60 p-1 hover:border-primary-light md:flex dark:border-muted-dark/60 dark:hover:border-primary-dark"
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
                    <Link
                        variant={false}
                        href="#about-me"
                        className="md:hidden"
                        aria-label="Scroll to about me"
                    >
                        <svg
                            aria-hidden
                            width="43"
                            height="15"
                            viewBox="0 0 43 15"
                            className="animate-[bounce_1.5s_ease-in-out_infinite] stroke-muted-light/60 dark:stroke-muted-dark/60"
                        >
                            <path
                                d="M1 1l20.5 12L42 1"
                                strokeWidth="2"
                                fill="none"
                            />
                        </svg>
                        <span className="sr-only" aria-hidden="true">
                            Scrolls to about me section
                        </span>
                    </Link>
                </motion.div>
            )}
        </section>
    );
}

Intro.propTypes = {};
