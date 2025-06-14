'use client';

import { useMemo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { LoadingSpinner } from '@/assets';

/**
 * A versatile button component that supports different variants, sizes, and states.
 * Can render as a button, link, or anchor element with motion animations.
 *
 * @param {('button'|'link'|'a')} [as='button'] - Element type to render
 * @param {string} [href] - URL for link/anchor variants
 * @param {React.ReactNode} children - Button content
 * @param {('primary'|'outline'|'ghost')} [variant='primary'] - Visual style variant
 * @param {('sm'|'md'|'lg')} [size='md'] - Size variant
 * @param {boolean} [fullWidth=false] - Whether to take full width
 * @param {boolean} [disabled=false] - Disabled state
 * @param {boolean} [loading=false] - Loading state
 * @param {boolean} [loadingText=true] - Show text during loading
 * @param {string} [className] - Additional CSS classes
 * @param {string} [ariaLabel] - Accessibility label
 * @param {('button'|'submit'|'reset')} [type='button'] - Button type
 * @returns {React.ReactNode} The rendered component
 */
const Button = (
    {
        as = 'button',
        href,
        children,
        variant = 'primary',
        size = 'md',
        fullWidth = false,
        disabled = false,
        loading = false,
        loadingText = true,
        className,
        'aria-label': ariaLabel,
        type = 'button',
        ...props
    },
    ref
) => {
    const MotionLink = useMemo(() => motion.create(Link), []);

    const baseStyles =
        'inline-flex items-center justify-center font-semibold tracking-wide focus:outline-none focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline focus-visible:outline-text-light dark:focus-visible:outline-text-dark';

    const variantStyles = {
        primary:
            'rounded-lg bg-gradient-to-r from-primary-light to-accent-light text-white shadow-md shadow-primary-light/20 hover:shadow-lg hover:shadow-primary-light/30 hover:from-accent-light hover:to-primary-light dark:from-primary-dark dark:to-accent-dark dark:shadow-primary-dark/20 dark:hover:shadow-primary-dark/30 dark:hover:from-accent-dark dark:hover:to-primary-dark',
        outline:
            'rounded-lg border-2 border-primary-light text-primary-light hover:border-accent-light hover:bg-primary-light/10 dark:border-primary-dark dark:text-white dark:hover:border-accent-dark dark:hover:bg-accent-dark/30',
        ghost: 'rounded-lg text-primary-light hover:bg-primary-light/10 dark:text-white dark:hover:bg-accent-dark/30',
    };

    const sizeStyles = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-5 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    };

    const disabledStyles = 'opacity-50 cursor-not-allowed';

    const combinedStyles = clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        (disabled || loading) && disabledStyles,
        className
    );

    const buttonContent = (
        <>
            {loading ? (
                <>
                    <LoadingSpinner />
                    {loadingText && (
                        <span
                            className="ml-2"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {children}
                        </span>
                    )}
                </>
            ) : (
                children
            )}
        </>
    );

    const commonProps = {
        ref,
        className: combinedStyles,
        'aria-disabled': disabled || loading,
        'aria-busy': loading,
        'aria-label':
            ariaLabel || (typeof children === 'string' ? children : undefined),
        'aria-live': loading ? 'polite' : undefined,
        ...props,
    };

    const motionProps =
        !disabled && !loading
            ? {
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
              }
            : undefined;

    if (as === 'link' && href && !disabled && !loading) {
        return (
            <MotionLink {...commonProps} {...motionProps} href={href}>
                {buttonContent}
            </MotionLink>
        );
    }

    if (as === 'a' && href && !disabled && !loading) {
        const isExternal =
            href.startsWith('http') ||
            href.endsWith('.pdf') ||
            href === '/joao_diogo_paulo_resume.pdf'; // TODO: Remove this hardcoded condition
        return (
            <motion.a
                {...commonProps}
                {...motionProps}
                href={href}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                target={isExternal ? '_blank' : undefined}
            >
                {buttonContent}
            </motion.a>
        );
    }

    return (
        <motion.button
            {...commonProps}
            {...motionProps}
            type={type}
            disabled={disabled || loading}
        >
            {buttonContent}
        </motion.button>
    );
};

Button.propTypes = {
    as: PropTypes.oneOf(['button', 'link', 'a']),
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'outline', 'ghost']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    loadingText: PropTypes.bool,
    className: PropTypes.string,
    'aria-label': PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
