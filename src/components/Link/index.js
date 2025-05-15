'use client';

import { memo } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import clsx from 'clsx';

const linkStyles = {
    base: 'font-sora focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-light dark:focus-visible:outline-text-dark',
    header: [
        'relative text-lg tracking-wide text-text-light hover:text-text-light/80',
        'dark:text-text-dark dark:hover:text-text-dark/90',
        'after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0',
        'after:bg-primary-light/90 after:transition-all after:duration-200',
        'hover:after:w-full dark:after:bg-primary-dark/90',
        'data-[active=true]:after:w-full',
    ],
    inline: [
        'relative text-primary-light hover:text-primary-light/80',
        'dark:text-primary-dark dark:hover:text-accent-dark',
        'after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0',
        'after:bg-primary-light/90 after:transition-all after:duration-200',
        'hover:after:w-full dark:after:bg-primary-dark/90',
        'data-[active=true]:after:w-full',
    ],
};

/**
 * A flexible link component that supports both internal and external links with different styling variants.
 *
 * @param {'header'|'inline'} [variant='inline'] - The visual style variant of the link
 * @param {string} href - The URL the link points to
 * @param {boolean} [isExternal=false] - Whether the link opens in a new tab
 * @param {React.ReactNode} children - The content to be rendered inside the link
 * @param {string} [ariaLabel] - Custom aria-label for accessibility
 * @param {string} [ariaCurrent] - Current state of the link for accessibility
 * @param {string} [className] - Additional CSS classes to apply
 * @param {boolean} [active=false] - Whether the link is active
 * @returns {React.ReactNode} A styled link component
 */
const Link = ({
    variant = 'inline',
    href,
    isExternal = false,
    children,
    ariaLabel,
    ariaCurrent,
    className,
    active = false,
    ...props
}) => {
    const baseStyles = clsx(
        linkStyles.base,
        variant === 'header' && linkStyles.header,
        variant === 'inline' && linkStyles.inline,
        className
    );

    const commonProps = {
        className: baseStyles,
        'data-active': active,
        ...(ariaLabel && { 'aria-label': ariaLabel }),
        ...(ariaCurrent && { 'aria-current': ariaCurrent }),
        ...props,
    };

    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...commonProps}
            >
                {children}
                <span className="sr-only" aria-hidden="true">
                    (opens in new window)
                </span>
            </a>
        );
    }

    return (
        <NextLink href={href} {...commonProps}>
            {children}
        </NextLink>
    );
};

Link.propTypes = {
    variant: PropTypes.oneOf(['header', 'inline', false]),
    href: PropTypes.string.isRequired,
    isExternal: PropTypes.bool,
    children: PropTypes.node.isRequired,
    ariaLabel: PropTypes.string,
    ariaCurrent: PropTypes.string,
    className: PropTypes.string,
    active: PropTypes.bool,
};

export default memo(Link);
