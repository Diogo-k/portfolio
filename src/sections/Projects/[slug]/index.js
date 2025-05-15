'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Text, Button, MDX } from '@/components';
import { SourceCode, RightArrow, LeftArrow, Book } from '@/assets';
import { SLIDE_UP, FADE_IN } from '@/constants/animations';

/**
 * Project page component that displays a single project with a back button and a title.
 *
 * @param {Object} project - The project data
 * @returns {React.ReactNode} The Project page component
 */
const ProjectPage = ({ project }) => {
    const searchParams = useSearchParams();
    const from = searchParams.get('from');

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const id = hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                const elementPosition =
                    element.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - 100;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
                return;
            }
        }
        window.scrollTo(0, 0);
    }, []);

    const titleDelay = project.name.split(' ').length * 0.1 + 0.5;

    return (
        <section className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28">
            <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    ...SLIDE_UP.transition,
                    delay: titleDelay,
                }}
                className="my-8"
            >
                <Button
                    variant="ghost"
                    size="sm"
                    as="link"
                    className="flex items-center gap-2 rounded-full"
                    href={from === 'home' ? '/#projects' : '/projects'}
                    aria-label="Back to projects"
                >
                    <LeftArrow className="size-4" />
                    Back to projects
                </Button>
            </motion.div>

            <Text as="h1" size="text-5xl" weight="font-bold" className="mb-6">
                {project.name.split(' ').map((word, index) => (
                    <span
                        key={index}
                        className="relative inline-flex overflow-hidden"
                    >
                        <motion.span
                            initial={{ y: '110%' }}
                            animate={{ y: '0%' }}
                            transition={{
                                ...SLIDE_UP.transition,
                                delay: index * 0.1,
                            }}
                            className="inline-flex whitespace-pre"
                        >
                            {word}
                            {index !== project.name.split(' ').length - 1
                                ? ' '
                                : ''}
                        </motion.span>
                    </span>
                ))}
            </Text>
            <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    ...SLIDE_UP.transition,
                    delay: titleDelay + 0.2,
                }}
                className="mb-6 flex items-center gap-4"
            >
                <div className="flex items-center gap-2">
                    <Text as="span" size="text-sm">
                        {new Date(project.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        })}
                    </Text>
                    {project.source && (
                        <Text as="span" size="text-sm">
                            •
                        </Text>
                    )}
                    {project.source && (
                        <div className="flex items-center gap-1">
                            <Book aria-hidden="true" className="size-4" />
                            <Text as="span" size="text-sm">
                                {`${project.readingTime} min read`}
                            </Text>
                        </div>
                    )}
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    ...FADE_IN.transition,
                    duration: 1,
                    delay: titleDelay + 0.5,
                }}
            >
                {project.longDescription && (
                    <Text as="p" size="text-lg" className="mb-8">
                        {project.longDescription}
                    </Text>
                )}

                {project.image && (
                    <figure className="relative mb-8">
                        <Image
                            alt={`${project.name} project preview`}
                            src={project.image || '/placeholder.png'}
                            width={1920}
                            height={1080}
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            placeholder="blur"
                            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                            className="rounded-md"
                        />
                        <figcaption className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                            {`${project.name} project preview`}
                        </figcaption>
                    </figure>
                )}

                <div className="mb-12 flex flex-wrap gap-4">
                    {project.repository && (
                        <Button
                            as="a"
                            href={project.repository}
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
                            variant="outline"
                            className="flex items-center gap-2"
                        >
                            <span>View Live Demo</span>
                            <RightArrow className="size-4" />
                        </Button>
                    )}
                </div>
                {project.source && <MDX {...project.source} />}
            </motion.div>
        </section>
    );
};

export default ProjectPage;
