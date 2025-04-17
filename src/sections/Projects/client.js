'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'motion/react';

import { Text, ProjectCard, Button } from '@/components';
import { Swipe, RightArrow } from '@/assets';

const containerVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 400 : -400,
        opacity: 0,
        transition: {
            duration: 0.25,
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.25,
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    },
    exit: (direction) => ({
        x: direction < 0 ? 400 : -400,
        opacity: 0,
        transition: {
            duration: 0.25,
            type: 'spring',
            stiffness: 300,
            damping: 30,
        },
    }),
};

/**
 * Projects section component that displays a list of projects with a pagination system.
 *
 * @param {Object} props - The component props
 * @param {Object} props.projects - The projects data
 * @returns {JSX.Element} The Projects section component
 */
export default function Projects({ projects, isProjectRoute = false }) {
    const [selectedTag, setSelectedTag] = useState('All');

    const [page, setPage] = useState(0);
    const itemsPerPage = isProjectRoute ? 10 : 2;

    const [direction, setDirection] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

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
        ...Array.from(
            new Map(
                projects
                    .flatMap((project) => project.tags)
                    .map((tag) => [tag.name, tag])
            ).values()
        ),
    ];

    const swipeThreshold = 10000;
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
            className={`mx-auto flex w-full max-w-5xl flex-col overflow-x-hidden px-4 py-20 sm:px-6 md:py-24 lg:py-28 ${
                isProjectRoute ? 'min-h-screen' : 'min-h-[60vh]'
            }`}
            aria-labelledby="projects-heading"
        >
            <motion.div
                initial={{ opacity: 0, y: -20 }}
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
                    className="mb-4"
                    id="projects-heading"
                    role="heading"
                    aria-label="Projects portfolio section"
                >
                    Projects
                </Text>
                <Text
                    as="h2"
                    size="text-sm"
                    weight="font-normal"
                    id="projects-intro-heading"
                    role="heading"
                    aria-label="Projects section introduction"
                    className="mb-4 sm:mb-6"
                >
                    Here you will see my most recent projects
                </Text>
                {isProjectRoute && (
                    <div
                        className="mb-6 flex flex-wrap gap-2 sm:mb-8"
                        role="tablist"
                        aria-label="Project filter tabs"
                    >
                        {uniqueTags.map(({ name }, index) => (
                            <motion.button
                                key={`${name}-${index}`}
                                onClick={() => handleTagClick(name)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`rounded-full px-4 py-2 text-sm font-medium focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-light dark:focus-visible:outline-text-dark ${
                                    name === selectedTag
                                        ? 'bg-accent-light text-white dark:bg-accent-dark'
                                        : 'bg-surface-light text-muted-light hover:bg-surface-light/80 dark:bg-surface-dark dark:text-surface-light dark:hover:bg-surface-dark/80'
                                }`}
                                role="tab"
                                aria-selected={name === selectedTag}
                            >
                                {name}
                            </motion.button>
                        ))}
                    </div>
                )}
                {totalPages > 1 && (
                    <>
                        <div className="flex flex-col items-center gap-4 pb-4">
                            <div
                                className="flex items-center justify-center gap-2"
                                role="tablist"
                                aria-label="Project pages navigation"
                            >
                                {Array.from({ length: totalPages }).map(
                                    (_, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => setPage(index)}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className={`h-2 rounded-full ${
                                                page === index
                                                    ? 'w-8 bg-primary-light dark:bg-primary-dark'
                                                    : 'w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'
                                            }`}
                                            aria-label={`Go to page ${index + 1} of ${totalPages}`}
                                            aria-selected={page === index}
                                            aria-controls="project-list"
                                            role="tab"
                                        />
                                    )
                                )}
                            </div>
                            <div className="sr-only" aria-live="polite">
                                Page {page + 1} of {totalPages}
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ delay: 0.3 }}
                            className="mb-6 flex flex-col items-center gap-4 sm:mb-8"
                        >
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>Swipe to navigate</span>
                                <motion.div
                                    animate={{ x: [0, 10, 0] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                    }}
                                >
                                    <Swipe className="size-5 fill-gray-500 dark:fill-gray-400" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </motion.div>
            <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={containerVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag={totalPages > 1 ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={(e, { offset, velocity }) => {
                        setIsDragging(false);
                        const swipe = swipePower(offset.x, velocity.x);

                        if (swipe < -swipeThreshold) {
                            paginate(1);
                        } else if (swipe > swipeThreshold) {
                            paginate(-1);
                        }
                    }}
                    className="grid h-full grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2"
                    role="tabpanel"
                    aria-label={`Project page ${page + 1}`}
                    id="project-list"
                >
                    {currentProjects.map((project, index) => (
                        <ProjectCard
                            isProjectRoute={isProjectRoute}
                            key={`${project.name}-${index}`}
                            index={index}
                            isDragging={isDragging}
                            {...project}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>
            {!isProjectRoute && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8 flex w-full grow items-center justify-center"
                >
                    <Button
                        as="link"
                        href="/projects"
                        variant="ghost"
                        size="md"
                        className="w-fit"
                    >
                        View all projects
                        <RightArrow className="ml-1 size-4" />
                    </Button>
                </motion.div>
            )}
        </section>
    );
}

Projects.propTypes = {
    projects: PropTypes.array.isRequired,
    page: PropTypes.bool,
};
