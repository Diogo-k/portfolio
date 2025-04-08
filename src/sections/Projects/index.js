'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { Text, Button, NextImage, Tag } from '@/components';
import { ArrowLink, SourceCode } from '@/assets';
import dynamicBlurDataUrl from '../../utils/dynamicBlurData';

const projects = [
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Portfolio',
        tags: [
            { name: 'Javascript', variant: 'frontend' },
            { name: 'Next.js', variant: 'frontend' },
            { name: 'Tailwind CSS', variant: 'frontend' },
        ],
        githubLink: 'https://github.com/Diogo-k/portfolio',
        projectLink: null,
    },
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Test 1',
        tags: [
            { name: 'Godot', variant: 'gamedev' },
            { name: 'Hobby', variant: 'others' },
        ],
        githubLink: 'https://github.com/Diogo-k/Satyrs-Escape',
        projectLink: '/satyrs-escape',
    },
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Teste 2',
        tags: [
            { name: 'Javascript', variant: 'frontend' },
            { name: 'Next.js', variant: 'frontend' },
            { name: 'Tailwind CSS', variant: 'frontend' },
        ],
        githubLink: 'https://github.com/Diogo-k/portfolio',
        projectLink: null,
    },
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Teste 3',
        tags: [
            { name: 'Godot', variant: 'gamedev' },
            { name: 'Hobby', variant: 'others' },
        ],
        githubLink: 'https://github.com/Diogo-k/Satyrs-Escape',
        projectLink: '/satyrs-escape',
    },
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Teste 4',
        tags: [
            { name: 'Javascript', variant: 'frontend' },
            { name: 'Next.js', variant: 'frontend' },
            { name: 'Tailwind CSS', variant: 'frontend' },
        ],
        githubLink: 'https://github.com/Diogo-k/portfolio',
        projectLink: null,
    },
    {
        image: '/satyr.png',
        blurDataURL: dynamicBlurDataUrl('/satyr.png'),
        name: 'Teste 5',
        tags: [
            { name: 'Godot', variant: 'gamedev' },
            { name: 'Hobby', variant: 'others' },
        ],
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

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

const ProjectCard = ({ image, name, tags, githubLink, projectLink, index }) => (
    <motion.div
        variants={index === 0 ? itemVariants : undefined}
        initial={index !== 0 ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, margin: '-50px' }}
        className="group pointer-events-none relative size-full max-w-md overflow-hidden rounded-xl p-4 transition-all duration-300"
    >
        <div className="mb-4 rounded-2xl bg-surface-light dark:bg-surface-dark">
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="size-full overflow-hidden rounded-2xl"
            >
                <NextImage
                    src={image}
                    alt={`${name} project preview`}
                    width="1280"
                    height="720"
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    draggable="false"
                />
            </motion.div>
        </div>

        <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold text-primary-light sm:text-2xl dark:text-text-dark">
                    {name}
                </h2>
                <div className="pointer-events-auto flex gap-2">
                    {githubLink && (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                as="a"
                                href={githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outline"
                                size="sm"
                                aria-label={`View source code for ${name}`}
                                className="rounded-full p-2"
                            >
                                <SourceCode className="size-5" />
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
                                rel="noopener noreferrer"
                                variant="outline"
                                size="sm"
                                aria-label={`View live demo of ${name}`}
                                className="rounded-full p-2"
                            >
                                <ArrowLink className="size-5" />
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {tags.map(({ name, variant }) => (
                    <Tag key={name} variant={variant}>
                        {name}
                    </Tag>
                ))}
            </div>
        </div>
    </motion.div>
);

ProjectCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            variant: PropTypes.string.isRequired,
        })
    ).isRequired,
    githubLink: PropTypes.string,
    projectLink: PropTypes.string,
    index: PropTypes.number.isRequired,
};

export default function Projects() {
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

    // Get unique tags from all projects
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
