'use client';

import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';
import clsx from 'clsx';

/**
 * Text component that displays a text with a size, responsive size, weight, align, and class name.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content of the text
 * @param {string} props.size - The size of the text
 * @returns {React.ReactNode} The rendered component
 */
const Text = ({
    as: Component = 'span',
    size = 'text-base',
    weight = 'font-normal',
    align = 'text-start',
    className = '',
    children,
    id,
    role,
    'aria-label': ariaLabel,
    ...props
}) => {
    const MotionComponent = useMemo(
        () => motion.create(Component),
        [Component]
    );

    return (
        <MotionComponent
            className={clsx(
                `${size} ${align} ${weight} text-text-light dark:text-text-dark`,
                className
            )}
            id={id}
            role={role}
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </MotionComponent>
    );
};

Text.propTypes = {
    as: PropTypes.elementType,
    size: PropTypes.string,
    weight: PropTypes.string,
    align: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    id: PropTypes.string,
    role: PropTypes.string,
    'aria-label': PropTypes.string,
};

Text.defaultProps = {
    as: 'span',
    size: 'text-base',
    weight: 'font-normal',
    align: 'text-start',
    className: '',
};

export default Text;
