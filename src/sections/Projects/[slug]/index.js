'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';

import { Text, Button, Tag } from '@/components';
import { ArrowLink, SourceCode, LeftArrow } from '@/assets';
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
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
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

export default function ProjectPage({ project }) {
    const searchParams = useSearchParams();
    const from = searchParams.get('from');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
        >
            <motion.div variants={itemVariants} className="my-8">
                <Button
                    variant="ghost"
                    size="sm"
                    as="link"
                    className="group flex items-center gap-2 rounded-full"
                    href={from === 'home' ? '/#projects' : '/projects'}
                    aria-label="Back to Projects"
                >
                    <LeftArrow className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                    Back to Projects
                </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
                <Text
                    as="h1"
                    size="text-4xl"
                    responsiveSize={{
                        sm: 'text-5xl',
                        md: 'text-6xl',
                    }}
                    weight="font-bold"
                    className="mb-4"
                >
                    {project.name}
                </Text>
                <Text
                    as="p"
                    size="lg"
                    className="text-text-light dark:text-text-dark"
                >
                    {project.longDescription}
                </Text>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="mb-8 overflow-hidden rounded-xl"
            >
                <div className="relative aspect-video w-full">
                    <Image
                        alt={`${project.name} project preview`}
                        src={project.image || '/placeholder.png'}
                        fill
                        sizes="(max-width: 768px) 50vw, 100vw"
                        placeholder="blur"
                        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                        className="object-cover"
                    />
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="mb-12 flex flex-wrap gap-4"
            >
                {project.repository && (
                    <Button
                        as="a"
                        href={project.repository}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <span>View Source Code</span>
                        <SourceCode className="size-6" />
                    </Button>
                )}
                {project.demo && (
                    <Button
                        as="a"
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <span>View Live Demo</span>
                        <ArrowLink className="size-6" />
                    </Button>
                )}
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-12">
                <div>
                    <Text
                        as="h2"
                        size="text-2xl"
                        weight="font-semibold"
                        className="mb-4"
                    >
                        Technologies
                    </Text>
                    <div className="flex flex-wrap gap-2">
                        {project.details.technologies.map((tech) => (
                            <Tag key={tech.name} variant={tech.variant}>
                                {tech.name}
                            </Tag>
                        ))}
                    </div>
                </div>

                <div>
                    <Text
                        as="h2"
                        size="text-2xl"
                        weight="font-semibold"
                        className="mb-4"
                    >
                        Features
                    </Text>
                    <ul className="list-inside list-disc space-y-2 text-text-light dark:text-text-dark">
                        {project.details.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <Text
                        as="h2"
                        size="text-2xl"
                        weight="font-semibold"
                        className="mb-4"
                    >
                        Challenges & Solutions
                    </Text>
                    <ul className="list-inside list-disc space-y-2 text-text-light dark:text-text-dark">
                        {project.details.challenges.map((challenge, index) => (
                            <li key={index}>{challenge}</li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}
