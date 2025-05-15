import PropTypes from 'prop-types';
import Image from 'next/image';
import { Link, Text, Tag } from '@/components';

/**
 * ProjectCard component that displays a project card
 *
 * @param {boolean} isProjectRoute - Whether the project card is in the project route
 * @param {boolean} isDragging - Whether the parent container is being dragged
 * @param {string} slug - The slug of the project
 * @param {string} thumbnail - The thumbnail of the project
 * @param {string} name - The name of the project
 * @param {string} description - The description of the project
 * @param {Array} tags - The tags for the project
 * @returns {React.ReactNode} The rendered component
 */
const ProjectCard = ({
    isProjectRoute,
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
                          query: { from: 'home' },
                      }
            }
        >
            <div className="group relative flex size-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-surface-light shadow-lg transition-shadow duration-300 hover:shadow-primary-light/20 dark:bg-surface-dark dark:hover:shadow-primary-dark/20">
                <div className="relative h-64 w-full overflow-hidden">
                    <Image
                        alt={`${name} project preview`}
                        src={thumbnail || '/static/placeholder.svg'}
                        fill
                        sizes="(max-width: 768px) 50vw, 100vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                        draggable="false"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex grow flex-col gap-4 p-6">
                    <div className="flex items-center justify-between">
                        <Text as="h2" size="text-xl" weight="font-bold">
                            {name}
                        </Text>
                    </div>
                    <div className="flex w-full items-center justify-start">
                        <Text
                            as="h2"
                            size="text-sm"
                            className="line-clamp-3 min-h-[40px] w-full"
                        >
                            {description}
                        </Text>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2">
                        {tags &&
                            tags.map(({ name, variant }) => (
                                <Tag key={name} variant={variant}>
                                    {name}
                                </Tag>
                            ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

ProjectCard.propTypes = {
    isProjectRoute: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            variant: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ProjectCard;
