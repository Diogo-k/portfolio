'use client';

import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion } from 'motion/react';

import { Button, Tag } from '@/components';

import { RightArrow } from '@/assets';

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
 * ProjectCard component that displays a project card
 *
 * @param {Object} props - The component props
 * @param {string} props.image - The image source for the project
 * @param {string} props.name - The name of the project
 * @param {Array} props.tags - The tags for the project
 * @param {number} props.index - The index of the project
 */
const ProjectCard = ({ image, slug, name, tags, index }) => {
    return (
        <motion.div
            variants={index === 0 ? itemVariants : undefined}
            initial={index !== 0 ? { opacity: 0, y: 0 } : undefined}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="group pointer-events-none relative size-full max-w-md overflow-hidden rounded-xl p-4 transition-all duration-300"
        >
            <div className="mb-4 rounded-2xl bg-surface-light dark:bg-surface-dark">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="size-full overflow-hidden rounded-2xl"
                >
                    <Image
                        alt={`${name} project preview`}
                        src={image}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                        width="1280"
                        height="720"
                        // placeholder="blur"
                        draggable="false"
                        // loading="lazy"
                    />
                </motion.div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-bold text-primary-light sm:text-2xl dark:text-text-dark">
                        {name}
                    </h2>
                    <div className="pointer-events-auto flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            as="link"
                            className="rounded-full p-2"
                            href={`/projects/${slug}`}
                            aria-label={`View ${name} details`}
                        >
                            <RightArrow className="size-5" />
                        </Button>
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
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            variant: PropTypes.string.isRequired,
        })
    ).isRequired,
    index: PropTypes.number.isRequired,
};

export default ProjectCard;
