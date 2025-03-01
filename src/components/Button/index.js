import { forwardRef } from 'react';
import clsx from 'clsx';

import './index.css';

const Button = forwardRef(
    (
        {
            as = 'button',
            href,
            children,
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            className,
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'relative font-semibold transition-all duration-200 focus:none tracking-wide';

        const variantStyles = {
            primary:
                'clip-button bg-primary-light text-white hover:bg-accent-light dark:bg-primary-dark dark:hover:bg-accent-dark',
            outline:
                'border-2 border-primary-light hover:bg-primary-light/10 text-primary-light hover:border-accent-light hover:text-accent-light dark:border-primary-dark dark:text-primary-dark dark:hover:border-accent-dark dark:hover:text-accent-dark dark:hover:bg-accent-dark/30',
            ghost: 'clip-button text-primary-light hover:bg-primary-light/10 dark:text-white dark:hover:bg-accent-dark/30',
        };

        const sizeStyles = {
            sm: 'px-3 py-1 text-sm',
            md: 'px-5 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        };

        const combinedStyles = clsx(
            'inline-flex items-center justify-center',
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            fullWidth && 'w-full',
            className
        );

        if (as === 'a' && href) {
            return (
                <a ref={ref} href={href} className={combinedStyles} {...props}>
                    {children}
                </a>
            );
        }

        return (
            <button ref={ref} className={combinedStyles} {...props}>
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
