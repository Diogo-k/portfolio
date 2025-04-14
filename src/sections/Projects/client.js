'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Text, ProjectCard } from '@/components';

const containerVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
    exit: (direction) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        transition: {
            duration: 0.4,
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    }),
};

export default function Projects({ projects }) {
    const [page, setPage] = useState(0);
    const [direction, setDirection] = useState(0);
    const [selectedTag, setSelectedTag] = useState('All');
    const itemsPerPage = 2;

    const filteredProjects =
        selectedTag === 'All'
            ? projects
            : projects.filter((project) =>
                  project.tags.some((tag) => tag.name === selectedTag)
              );

    const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
    const currentProjects = filteredProjects.slice(
        page * itemsPerPage,
        (page + 1) * itemsPerPage
    );

    const uniqueTags = [
        { name: 'All' },
        ...new Set(projects.flatMap((project) => project.tags)),
    ];

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

    const handleTagClick = (tagName) => {
        setSelectedTag(tagName);
        setPage(0);
        setDirection(0);
    };

    return (
        <section
            id="projects"
            className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
            aria-labelledby="projects-heading"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
            >
                <Text
                    as="h1"
                    size="text-4xl"
                    responsiveSize={{
                        sm: 'text-5xl',
                    }}
                    weight="font-bold"
                    className="mb-8 sm:mb-12"
                    id="projects-heading"
                    role="heading"
                    aria-label="Projects portfolio section"
                >
                    Projects
                </Text>
                <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
                    {uniqueTags.map(({ name }, index) => (
                        <motion.button
                            key={`${name}-${index}`}
                            onClick={() => handleTagClick(name)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                                name === selectedTag
                                    ? 'bg-primary-light text-white dark:bg-primary-dark'
                                    : 'bg-surface-light text-muted-light hover:bg-surface-light/80 dark:bg-surface-dark dark:text-muted-dark dark:hover:bg-surface-dark/80'
                            }`}
                            role="tab"
                            aria-selected={name === selectedTag}
                        >
                            {name}
                        </motion.button>
                    ))}
                </div>
                <div className="flex flex-col items-center gap-4 pb-4">
                    <div
                        className="flex items-center justify-center gap-2"
                        role="tablist"
                        aria-label="Project pages"
                    >
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setPage(index)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    page === index
                                        ? 'w-8 bg-primary-light dark:bg-primary-dark'
                                        : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'
                                }`}
                                aria-label={`Go to page ${index + 1}`}
                                aria-current={
                                    page === index ? 'page' : undefined
                                }
                                role="tab"
                            />
                        ))}
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: 0.3 }}
                    className="mb-6 flex flex-col items-center gap-4 sm:mb-8"
                >
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="hidden sm:inline">
                            Swipe to navigate
                        </span>
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
                                className="size-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
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
                        className="grid min-h-[500px] flex-1 grid-cols-1 place-items-center gap-6 sm:gap-8 md:grid-cols-2"
                        role="tabpanel"
                        aria-label={`Project page ${page + 1}`}
                    >
                        {currentProjects.map((project, index) => (
                            <ProjectCard
                                key={project.name}
                                index={index}
                                {...project}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
