'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { Text, Button, NextImage, Tag } from '@/components';
import { ArrowLink, SourceCode } from '@/assets';
import dynamicBlurDataUrl from '../../utils/dynamicBlurData';

const projects = [
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Portfolio',
        tags: ['Javascript', 'Next.js', 'Tailwind CSS'],
        githubLink: 'https://github.com/Diogo-k/portfolio',
        projectLink: null,
    },
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Test 1',
        tags: ['Godot', 'Hobby'],
        githubLink: 'https://github.com/Diogo-k/Satyrs-Escape',
        projectLink: '/satyrs-escape',
    },
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Teste 2',
        tags: ['Javascript', 'Next.js', 'Tailwind CSS'],
        githubLink: 'https://github.com/Diogo-k/portfolio',
        projectLink: null,
    },
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Teste 3',
        tags: ['Godot', 'Hobby'],
        githubLink: 'https://github.com/Diogo-k/Satyrs-Escape',
        projectLink: '/satyrs-escape',
    },
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Teste 4',
        tags: ['Javascript', 'Next.js', 'Tailwind CSS'],
        githubLink: 'https://github.com/Diogo-k/portfolio',
        projectLink: null,
    },
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Teste 5',
        tags: ['Godot', 'Hobby'],
        githubLink: 'https://github.com/Diogo-k/Satyrs-Escape',
        projectLink: '/satyrs-escape',
    },
];

const containerVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.25,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
    exit: (direction) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        transition: {
            duration: 0.25,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    }),
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
    },
};

export default function Projects() {
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const itemsPerPage = 2;
    const totalPages = Math.ceil(projects.length / itemsPerPage);

    // Get unique tags from all projects
    const uniqueTags = [
        'All',
        ...new Set(projects.flatMap((project) => project.tags)),
        ...new Set(projects.flatMap((project) => project.tags)),
        ...new Set(projects.flatMap((project) => project.tags)),
        ...new Set(projects.flatMap((project) => project.tags)),
    ];

    const currentProjects = projects.slice(
        page * itemsPerPage,
        (page + 1) * itemsPerPage
    );

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset, velocity) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection) => {
        const nextPage = page + newDirection;
        if (nextPage >= 0 && nextPage < totalPages) {
            setDirection(newDirection);
            setPage(nextPage);
        }
    };

    return (
        <section
            id="projects"
            className="mx-auto flex h-screen max-w-5xl flex-col"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <Text
                    as="h1"
                    size="text-5xl"
                    weight="font-bold"
                    className="mb-6"
                >
                    Projects
                </Text>
                <div className="mb-8 flex flex-wrap gap-2">
                    {uniqueTags.map((tag, index) => (
                        <button
                            key={`${tag}-${index}`}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                tag === 'All'
                                    ? 'bg-primary-light text-white dark:bg-primary-dark'
                                    : 'bg-surface-light text-muted-light dark:bg-surface-dark dark:text-muted-dark'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col items-center gap-4 pb-4">
                    <div className="flex items-center justify-center gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    page === index
                                        ? 'w-8 bg-primary-light dark:bg-primary-dark'
                                        : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'
                                }`}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mb-8 flex flex-col items-center gap-6"
                >
                    {/* Swipe Indicator */}
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>Swipe to navigate</span>
                        <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                delay: 1,
                            }}
                            className="flex items-center gap-1"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>

            <div className="relative flex flex-1 flex-col overflow-hidden">
                <AnimatePresence initial={false} mode="wait" custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={containerVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-2"
                    >
                        {currentProjects.map(
                            ({
                                image,
                                name,
                                tags,
                                githubLink,
                                projectLink,
                            }) => (
                                <motion.div
                                    key={name}
                                    variants={
                                        page === 0 ? itemVariants : undefined
                                    }
                                    initial={
                                        page !== 0
                                            ? { opacity: 1, y: 0 }
                                            : undefined
                                    }
                                    viewport={{ once: true }}
                                    className="group pointer-events-none relative max-w-md overflow-hidden transition-all duration-300"
                                >
                                    <div className="mb-2 overflow-hidden rounded-2xl">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <NextImage
                                                src={image}
                                                alt={name}
                                                width="1280"
                                                height="1024"
                                                loading="lazy"
                                                decoding="async"
                                                className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                draggable="false"
                                            />
                                        </motion.div>
                                    </div>

                                    <div className="flex items-center px-3 pb-4">
                                        <div className="grow">
                                            <h2 className="text-2xl font-bold text-primary-light dark:text-text-dark">
                                                {name}
                                            </h2>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {tags.map((tag) => (
                                                    <Tag key={tag}>{tag}</Tag>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="pointer-events-auto ml-auto flex gap-2">
                                            {githubLink && (
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        as="a"
                                                        href={githubLink}
                                                        target="_blank"
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <SourceCode />
                                                    </Button>
                                                </motion.div>
                                            )}
                                            {projectLink && (
                                                <motion.div
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        as="a"
                                                        href={projectLink}
                                                        target="_blank"
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <ArrowLink />
                                                    </Button>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
