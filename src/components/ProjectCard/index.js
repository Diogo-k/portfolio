import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion } from 'motion/react';

import { Link, Text, Tag } from '@/components';

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
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
 * @param {boolean} props.isDragging - Whether the parent container is being dragged
 * @returns {React.ReactNode} The rendered component
 */
const ProjectCard = ({
    isProjectRoute,
    index,
    isDragging = false,
    slug,
    thumbnail,
    name,
    description,
    tags,
}) => {
    return (
        <Link
            className={`block w-full ${isDragging && 'pointer-events-none'}`}
            draggable="false"
            variant="empty"
            href={
                isProjectRoute
                    ? `/projects/${slug}`
                    : {
                          pathname: `/projects/${slug}`,
                          query: { fromHome: true },
                      }
            }
        >
            <motion.div
                variants={index === 0 ? itemVariants : undefined}
                initial={index !== 0 ? { opacity: 0, y: 0 } : undefined}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className="group relative flex size-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-surface-light shadow-lg transition-shadow duration-300 hover:shadow-primary-light/20 dark:bg-surface-dark dark:hover:shadow-primary-dark/20"
            >
                <div className="relative h-64 w-full overflow-hidden">
                    <Image
                        alt={`${name} project preview`}
                        src={thumbnail || '/static/placeholder.svg'}
                        width="1920"
                        height="1080"
                        placeholder="blur"
                        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                        draggable="false"
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex grow flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                        <Text
                            as="h2"
                            size="text-xl"
                            weight="font-bold"
                            responsiveSize={{ sm: 'text-2xl' }}
                        >
                            {name}
                        </Text>
                    </div>
                    <div className="flex w-full items-center justify-start">
                        <Text
                            as="h2"
                            size="text-sm"
                            responsiveSize={{ sm: 'text-base' }}
                            className="line-clamp-3 min-h-[40px] w-full"
                        >
                            {description}
                        </Text>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2">
                        {tags.map(({ name, variant }) => (
                            <Tag key={name} variant={variant}>
                                {name}
                            </Tag>
                        ))}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

ProjectCard.propTypes = {
    thumbnail: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            variant: PropTypes.string.isRequired,
        })
    ).isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
};

export default ProjectCard;
