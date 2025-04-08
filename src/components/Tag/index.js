import PropTypes from 'prop-types';
import clsx from 'clsx';

import { motion } from 'framer-motion';

const variants = {
    primary: 'bg-primary-light dark:bg-primary-dark',
    frontend: 'bg-primary-light dark:bg-primary-dark',
    backend: 'bg-blue-800 dark:bg-blue-800',
    database: 'bg-emerald-800 dark:bg-emerald-800',
    tools: 'bg-violet-800 dark:bg-violet-800',
    cloud: 'bg-orange-700 dark:bg-orange-700',
    gamedev: 'bg-fuchsia-800 dark:bg-fuchsia-800',
    others: 'bg-gray-700 dark:bg-gray-700',
};

export default function Tag({
    children,
    variant = 'primary',
    className,
    icon: Icon,
}) {
    return (
        <motion.span
            className={clsx(
                'inline-flex items-center gap-1.5 rounded-2xl px-3 py-1 text-xs font-semibold text-white',
                variants[variant],
                className
            )}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            {Icon && (
                <Icon className="size-3.5 fill-white" aria-hidden="true" />
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
};
