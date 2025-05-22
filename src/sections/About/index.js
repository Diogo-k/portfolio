'use client';

import { motion } from 'motion/react';
import { Text, Button, ProfileImage, Skills } from '@/components';
import { RightArrow } from '@/assets';
import { FADE_IN, FADE_IN_SLIDE_DOWN } from '@/constants/animations';
import config from '@/config';

/**
 * About section component that displays personal information and skills
 *
 * @returns {React.ReactNode} The About section component
 */
const About = () => {
    const { about, skills } = config;

    return (
        <section
            id="about-me"
            className="mx-auto flex min-h-[50vh] max-w-5xl flex-col overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
            aria-label="About me section"
            role="banner"
        >
            <Text
                as="h1"
                size="text-4xl"
                weight="font-bold"
                id="about-me-heading"
                role="heading"
                aria-label="About me section"
                className="mb-4"
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                    ...FADE_IN_SLIDE_DOWN.transition,
                }}
            >
                About me
            </Text>
            <Text
                as="h2"
                size="text-lg"
                weight="font-normal"
                id="about-me-intro-heading"
                role="heading"
                aria-label="Get to know me section"
                className="mb-4 sm:mb-6"
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                    ...FADE_IN_SLIDE_DOWN.transition,
                    delay: 0.2,
                }}
            >
                Uncover my passion and experience
            </Text>
            <motion.div
                variants={FADE_IN}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                    ...FADE_IN.transition,
                    duration: 1,
                    delay: 0.5,
                }}
                className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2"
            >
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {about.map((paragraph, index) => (
                            <div key={index}>
                                <Text
                                    size="text-sm"
                                    id={`about-paragraph-${index}`}
                                    role="article"
                                    dangerouslySetInnerHTML={{
                                        __html: paragraph,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                    <Button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        as="a"
                        href="/joao_diogo_paulo_resume.pdf"
                        size="md"
                        variant="primary"
                        className="mt-5 w-fit md:mt-0"
                        aria-label="View CV (joao_diogo_paulo_resume.pdf) in new tab"
                    >
                        View CV
                        <RightArrow
                            className="ml-1 size-4"
                            aria-hidden="true"
                        />
                    </Button>
                </div>
                <div className="flex flex-col">
                    <ProfileImage />
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                    ...FADE_IN_SLIDE_DOWN.transition,
                    delay: 0.7,
                }}
                className="mt-32"
            >
                <Text
                    as="h3"
                    size="text-4xl"
                    weight="font-semibold"
                    align="text-center"
                    id="skills-heading"
                    role="heading"
                    aria-label="My skills section"
                >
                    My Skills
                </Text>
            </motion.div>

            <motion.div
                variants={FADE_IN}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                    ...FADE_IN.transition,
                    duration: 1,
                    delay: 0.9,
                }}
            >
                <div className="mt-8 grid grid-cols-1 justify-center gap-8 md:grid-cols-2 lg:grid-cols-2">
                    <div className="flex flex-col items-center rounded-xl bg-surface-light p-6 dark:bg-surface-dark">
                        <Text
                            as="h3"
                            size="text-xl"
                            weight="font-semibold"
                            className="mb-4"
                        >
                            Frontend
                        </Text>
                        <Skills
                            skills={skills.frontend}
                            className="flex flex-wrap justify-center gap-2"
                        />
                    </div>
                    <div className="flex flex-col items-center rounded-xl bg-surface-light p-6 dark:bg-surface-dark">
                        <Text
                            as="h3"
                            size="text-xl"
                            weight="font-semibold"
                            className="mb-4"
                        >
                            Expanding to the Backend
                        </Text>
                        <Skills
                            skills={skills.backend}
                            className="flex flex-wrap justify-center gap-2"
                        />
                    </div>
                    <div className="col-span-full mx-auto flex w-full max-w-2xl flex-col items-center rounded-xl bg-surface-light p-6 md:w-1/2 dark:bg-surface-dark">
                        <Text
                            as="h3"
                            size="text-xl"
                            weight="font-semibold"
                            className="mb-4"
                        >
                            Others
                        </Text>
                        <Skills
                            skills={skills.others}
                            className="flex flex-wrap justify-center gap-2"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default About;
