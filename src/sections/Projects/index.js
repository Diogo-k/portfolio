'use client';

import { motion } from 'framer-motion';

import { Text, Button, NextImage } from '@/components';
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

export default function Projects() {
    return (
        <section
            id="projects"
            className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-center"
        >
            <Text as="h1" size="text-5xl" weight="font-bold" className="mb-12">
                Projects
            </Text>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {projects.map(
                    ({
                        image,
                        blurDataURL,
                        name,
                        tags,
                        githubLink,
                        projectLink,
                    }) => (
                        <div key={name} className="max-w-md">
                            <div className="mb-2 overflow-hidden rounded-2xl bg-primary-light">
                                <NextImage
                                    src={image}
                                    blurDataURL={false} //? TODO: ADD LATER
                                    alt="StockIn"
                                    width="1280"
                                    height="1024"
                                    loading="lazy"
                                    decoding="async"
                                    className="h-72 w-full object-cover"
                                />
                            </div>

                            <div className="flex items-center px-3">
                                <div className="grow">
                                    <h2 className="text-2xl font-bold text-primary-light dark:text-text-dark">
                                        {name}
                                    </h2>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-2xl bg-accent-light px-3 py-1 text-xs font-semibold text-white dark:bg-accent-dark"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="ml-auto flex gap-2">
                                    {githubLink && (
                                        <Button
                                            as="a"
                                            href={githubLink}
                                            target="_blank"
                                            variant="outline"
                                            size="sm"
                                        >
                                            <SourceCode />
                                        </Button>
                                    )}
                                    {projectLink && (
                                        <Button
                                            as="a"
                                            href={projectLink}
                                            target="_blank"
                                            variant="outline"
                                            size="sm"
                                        >
                                            <ArrowLink />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
            {/* <a
                target="_blank"
                href="https://github.com/Gothsec?tab=repositories"
                aria-label="GitHub"
                className="mt-9 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--white-icon-tr)] bg-[#1414149c] p-3 text-[var(--white-icon)] transition duration-300 ease-in-out hover:bg-[var(--white-icon-tr)] hover:text-white"
            >
                <span className="text-md md:text-lg">More projects on</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                >
                    <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
                </svg>
            </a> */}
        </section>
    );
}
