'use client';

import { motion } from 'framer-motion';

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
        name: "Satyr's Escape",
        tags: ['Godot', 'Hobby'],
        githubLink: 'https://github.com/Diogo-k/Satyrs-Escape',
        projectLink: '/satyrs-escape',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

export default function Projects() {
    return (
        <section
            id="projects"
            className="mx-auto flex h-screen max-w-5xl flex-col"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Text
                    as="h1"
                    size="text-5xl"
                    weight="font-bold"
                    className="mb-12"
                >
                    Projects
                </Text>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
                {projects.map(
                    ({ image, name, tags, githubLink, projectLink }) => (
                        <motion.div
                            key={name}
                            variants={itemVariants}
                            className="group relative max-w-md overflow-hidden transition-all duration-300"
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
                                <div className="ml-auto flex gap-2">
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
        </section>
    );
}
