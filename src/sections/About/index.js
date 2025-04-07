'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Text, Tag, Button } from '@/components';

const skills = [
    // Core & Frontend (Red)
    { name: 'JavaScript', variant: 'frontend' },
    { name: 'TypeScript', variant: 'frontend' },
    { name: 'HTML5', variant: 'frontend' },
    { name: 'CSS/Sass', variant: 'frontend' },
    { name: 'React.js', variant: 'frontend' },
    { name: 'Next.js', variant: 'frontend' },
    { name: 'React Native', variant: 'frontend' },
    { name: 'Redux', variant: 'frontend' },
    { name: 'React Query', variant: 'frontend' },
    { name: 'Tailwind CSS', variant: 'frontend' },
    { name: 'Framer Motion', variant: 'frontend' },

    // Backend (Blue)
    { name: 'Node.js', variant: 'backend' },
    { name: 'Express', variant: 'backend' },
    { name: 'GraphQL', variant: 'backend' },

    // Databases (Green)
    { name: 'MongoDB', variant: 'database' },
    { name: 'SQL', variant: 'database' },

    // Development Tools (Purple)
    { name: 'Git', variant: 'tools' },
    { name: 'Docker', variant: 'tools' },
    { name: 'Webpack', variant: 'tools' },
    { name: 'PNPM', variant: 'tools' },

    // Cloud & Deployment (Orange)
    { name: 'AWS', variant: 'cloud' },
    { name: 'Vercel', variant: 'cloud' },
    { name: 'Netlify', variant: 'cloud' },
    { name: 'Heroku', variant: 'cloud' },
];

const aboutMeParagraphs = [
    "Hey, I'm Diogo Paulo, a Frontend Developer from Lisbon who enjoys crafting clean, efficient, and user-focused digital experiences. I work mostly with React, Next.js, and React Native, and I'm all about building scalable, maintainable solutions that make life easier for users and teams.",
    "Over the years, I've helped revamp legacy platforms, launch eCommerce sites, and build custom tools for industries like real estate, pharma, and even forest conservation. I love turning complex ideas into smooth, performant interfaces that just work.",
    "Outside of coding, I'm into video games, anime, and more recently, game development as a creative outlet. I'm always looking for new challenges to grow whether that's diving into a new framework or jumping out of a plane just to push myself. That mindset drives how I learn, build, and collaborate.",
    "Always open to cool ideas and new projects let's connect.",
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

/**
 * Skills component that displays a grid of skill tags with animations
 */
const Skills = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="flex flex-wrap gap-2"
        role="list"
        aria-label="Technical skills list"
    >
        {skills.map((skill) => (
            <Tag
                key={skill.name}
                variant={skill.variant}
                className="transition-all duration-300 hover:scale-105"
                role="listitem"
                aria-label={`${skill.name} skill`}
            >
                {skill.name}
            </Tag>
        ))}
    </motion.div>
);

Skills.propTypes = {
    skills: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            variant: PropTypes.oneOf([
                'frontend',
                'backend',
                'database',
                'tools',
                'cloud',
            ]).isRequired,
        })
    ),
};

/**
 * ProfileImage component with error handling and loading state
 */
const ProfileImage = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="group relative h-[300px] w-full overflow-hidden rounded-2xl bg-surface-light shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary-light/20 sm:h-[350px] md:h-[400px] dark:bg-surface-dark dark:hover:shadow-primary-dark/20">
            {isLoading && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-surface-light dark:bg-surface-dark"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="size-8 animate-spin rounded-full border-4 border-primary-light border-t-transparent dark:border-primary-dark" />
                </motion.div>
            )}
            {isError ? (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-surface-light dark:bg-surface-dark"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <Text size="text-lg" weight="font-medium">
                            Failed to load image
                        </Text>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                setIsError(false);
                                setIsLoading(true);
                            }}
                        >
                            Try again
                        </Button>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className="relative size-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image
                        src="/me_skydive.jpeg"
                        alt="Diogo Paulo - Frontend Developer"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setIsError(true);
                            setIsLoading(false);
                        }}
                    />
                </motion.div>
            )}
        </div>
    );
};

ProfileImage.propTypes = {};

/**
 * About section component that displays personal information and skills
 */
export default function About() {
    const MotionButton = motion.create(Button);

    return (
        <section
            id="about-me"
            className="mx-auto flex min-h-[50vh] max-w-5xl flex-col px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
            aria-labelledby="about-heading"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Text
                    as="h1"
                    size="text-4xl"
                    responsiveSize={{
                        sm: 'text-5xl',
                    }}
                    weight="font-bold"
                    className="mb-8 sm:mb-12"
                    id="about-heading"
                    role="heading"
                    aria-label="About me section"
                >
                    About Me
                </Text>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-4 sm:gap-6"
                >
                    <Text
                        as="h2"
                        size="text-xl"
                        responsiveSize={{
                            sm: 'text-2xl',
                        }}
                        weight="font-bold"
                        className="mb-3 sm:mb-4"
                        id="about-intro-heading"
                        role="heading"
                        aria-label="Get to know me section"
                    >
                        Get to know me!
                    </Text>
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {aboutMeParagraphs.map((paragraph, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                            >
                                <Text
                                    id={`about-paragraph-${index}`}
                                    role="article"
                                    size="text-sm"
                                    responsiveSize={{
                                        sm: 'text-base',
                                    }}
                                >
                                    {paragraph}
                                </Text>
                            </motion.div>
                        ))}
                    </div>
                    <MotionButton
                        as="a"
                        href="/Joao_Paulo_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="md"
                        variant="primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 w-fit"
                        aria-label="View CV in new tab"
                    >
                        View CV
                    </MotionButton>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6 sm:gap-8"
                >
                    <ProfileImage />
                    <Text
                        as="h2"
                        size="text-xl"
                        responsiveSize={{
                            sm: 'text-2xl',
                        }}
                        weight="font-bold"
                        id="skills-heading"
                        role="heading"
                        aria-label="Technical skills section"
                    >
                        My Skills
                    </Text>
                    <Skills />
                </motion.div>
            </div>
        </section>
    );
}

About.propTypes = {};
