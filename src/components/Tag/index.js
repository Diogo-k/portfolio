import PropTypes from 'prop-types';
import clsx from 'clsx';

import * as motion from 'motion/react-client';

const variants = {
    ghost: 'text-text-light bg-primary-light/10 dark:text-text-dark dark:bg-accent-dark/30 border border-1 border-primary-light dark:border-primary-dark',
    primary: 'bg-primary-light dark:bg-primary-dark text-white',
    frontend: 'bg-primary-light dark:bg-primary-dark text-white',
    backend: 'bg-blue-800 dark:bg-blue-800 text-white',
    database: 'bg-emerald-800 dark:bg-emerald-800 text-white',
    tools: 'bg-violet-800 dark:bg-violet-800 text-white',
    cloud: 'bg-orange-700 dark:bg-orange-700 text-white',
    gamedev: 'bg-fuchsia-800 dark:bg-fuchsia-800 text-white',
    others: 'bg-gray-700 dark:bg-gray-700 text-white',
};

/**
 * Tag component that displays a tag with a variant and an icon.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content of the tag
 * @param {string} props.variant - The variant of the tag
 * @param {string} props.className - The class name of the tag
 * @param {React.ReactNode} props.icon - The icon of the tag
 * @param {boolean} props.whileHover - Whether the tag should scale on hover
 * @returns {React.ReactNode} The rendered component
 */
export default function Tag({
    children,
    variant = 'primary',
    className,
    icon: Icon,
    whileHover = false,
}) {
    return (
        <motion.span
            className={clsx(
                'inline-flex items-center gap-1.5 rounded-2xl px-3 py-1 text-xs font-semibold',
                variants[variant],
                className
            )}
            whileHover={whileHover && { scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            {Icon && (
                <Icon aria-hidden="true" color="default" className="size-4" />
            )}
            {children}
        </motion.span>
    );
}

Tag.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(Object.keys(variants)),
    className: PropTypes.string,
    icon: PropTypes.elementType,
    whileHover: PropTypes.bool,
};

Tag.defaultProps = {
    icon: null,
    whileHover: false,
};
