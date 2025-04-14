'use client';

import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { useModal } from '@/context';

import { Text, Button, Tag } from '@/components';

import { ArrowLink, SourceCode } from '@/assets';

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

/**
 * ProjectCard component that displays a project card with a modal for details.
 *
 * @param {Object} props - The component props
 * @param {string} props.image - The image source for the project
 * @param {string} props.name - The name of the project
 * @param {Array} props.tags - The tags for the project
 * @param {string} props.githubLink - The link to the project's GitHub repository
 * @param {string} props.projectLink - The link to the project's live demo
 * @param {number} props.index - The index of the project
 * @param {string} props.description - The description of the project
 * @param {Object} props.details - The details of the project
 */
const ProjectCard = ({
    image,
    name,
    tags,
    githubLink,
    projectLink,
    index,
    description,
    details,
}) => {
    const { openModal } = useModal();

    const handleOpenModal = () => {
        openModal({
            title: name,
            ariaLabel: `${name} project details`,
            children: (
                <div className="space-y-6">
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                            alt={`${name} project preview`}
                            src={image}
                            width="1280"
                            height="720"
                            className="size-full object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <Text
                            as="p"
                            size="base"
                            className="text-text-light dark:text-text-dark"
                        >
                            {description}
                        </Text>

                        <div className="space-y-4">
                            <div>
                                <Text
                                    as="h3"
                                    size="lg"
                                    weight="font-semibold"
                                    className="mb-2"
                                >
                                    Technologies Used
                                </Text>
                                <div className="flex flex-wrap gap-2">
                                    {details.technologies.map((tech) => (
                                        <Tag key={tech} variant="frontend">
                                            {tech}
                                        </Tag>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <Text
                                    as="h3"
                                    size="lg"
                                    weight="font-semibold"
                                    className="mb-2"
                                >
                                    Key Features
                                </Text>
                                <ul className="list-inside list-disc space-y-1 text-text-light dark:text-text-dark">
                                    {details.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <Text
                                    as="h3"
                                    size="lg"
                                    weight="font-semibold"
                                    className="mb-2"
                                >
                                    Challenges & Solutions
                                </Text>
                                <ul className="list-inside list-disc space-y-1 text-text-light dark:text-text-dark">
                                    {details.challenges.map(
                                        (challenge, index) => (
                                            <li key={index}>{challenge}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        });
    };

    return (
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
                    {/* <Image
                        alt={`${name} project preview`}
                        src={image}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                        width="1280"
                        height="720"
                        placeholder="blur"
                        draggable="false"
                        loading="lazy"
                    /> */}
                </motion.div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-bold text-primary-light sm:text-2xl dark:text-text-dark">
                        {name}
                    </h2>
                    <div className="pointer-events-auto flex gap-2">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleOpenModal}
                                aria-label={`View details for ${name}`}
                                className="rounded-full p-2"
                            >
                                <svg
                                    className="size-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </Button>
                        </motion.div>
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
};

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
    description: PropTypes.string.isRequired,
    details: PropTypes.shape({
        technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
        features: PropTypes.arrayOf(PropTypes.string).isRequired,
        challenges: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default ProjectCard;
