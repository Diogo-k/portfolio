'use client';

import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * A versatile button component that supports different variants, sizes, and states.
 * Can render as a button, link, or anchor element with motion animations.
 *
 * @param {Object} props - Component props
 * @param {('button'|'link'|'a')} [props.as='button'] - Element type to render
 * @param {string} [props.href] - URL for link/anchor variants
 * @param {React.ReactNode} props.children - Button content
 * @param {('primary'|'outline'|'ghost')} [props.variant='primary'] - Visual style variant
 * @param {('sm'|'md'|'lg')} [props.size='md'] - Size variant
 * @param {boolean} [props.fullWidth=false] - Whether to take full width
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {boolean} [props.loading=false] - Loading state
 * @param {boolean} [props.loadingText=true] - Show text during loading
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.ariaLabel] - Accessibility label
 * @param {('button'|'submit'|'reset')} [props.type='button'] - Button type
 * @param {React.Ref} ref - Forwarded ref
 */
const Button = forwardRef(
    (
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
        const MotionLink = motion.create(Link);

        const baseStyles =
            'font-semibold tracking-wide focus:outline-none focus-visible:outline-offset-4 focus-visible:outline-2 focus-visible:outline focus-visible:outline-text-light dark:focus-visible:outline-text-dark';

        const variantStyles = {
            primary:
                'rounded-lg bg-gradient-to-r from-primary-light to-accent-light text-white shadow-md shadow-primary-light/20 hover:shadow-lg hover:shadow-primary-light/30 hover:from-accent-light hover:to-primary-light dark:from-primary-dark dark:to-accent-dark dark:shadow-primary-dark/20 dark:hover:shadow-primary-dark/30 dark:hover:from-accent-dark dark:hover:to-primary-dark transition-all duration-300',
            outline:
                'rounded-lg border-2 border-primary-light text-primary-light hover:border-accent-light hover:bg-primary-light/10 hover:text-accent-light dark:border-primary-dark dark:text-white dark:hover:border-accent-dark dark:hover:bg-accent-dark/30 transition-all duration-300',
            ghost: 'rounded-lg text-primary-light hover:bg-primary-light/10 dark:text-white dark:hover:bg-accent-dark/30 transition-all duration-300',
        };

        const sizeStyles = {
            sm: 'px-3 py-1 text-sm',
            md: 'px-5 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        };

        const disabledStyles = 'opacity-50 cursor-not-allowed';

        const combinedStyles = clsx(
            'inline-flex items-center justify-center',
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            fullWidth && 'w-full',
            (disabled || loading) && disabledStyles,
            className
        );

        const LoadingSpinner = () => (
            <svg
                className="size-6 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
                role="status"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
        );

        const buttonContent = (
            <>
                {loading ? (
                    <>
                        <LoadingSpinner />
                        {loadingText && (
                            <span className="ml-2" aria-live="polite">
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
                ariaLabel ||
                (typeof children === 'string' ? children : undefined),
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
            const isExternal = href.startsWith('http') || href.endsWith('.pdf');
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
    }
);

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

Button.displayName = 'Button';

export default Button;
