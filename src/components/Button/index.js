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
            'relative font-bold transition-all duration-300 focus:outline-none tracking-wide uppercase overflow-hidden';

        const variantStyles = {
            primary:
                'bg-primary-light text-white hover:bg-accent-light dark:bg-primary-dark dark:hover:bg-accent-dark',
            secondary:
                'bg-secondary-light text-white hover:bg-tertiary-light dark:bg-secondary-dark dark:hover:bg-tertiary-dark',
            outline:
                'border-2 border-primary-light text-primary-light hover:border-accent-light hover:text-accent-light dark:border-primary-dark dark:text-primary-dark dark:hover:border-accent-dark dark:hover:text-accent-dark',
            ghost: 'text-primary-light hover:bg-primary-light/10 dark:text-primary-dark dark:hover:bg-primary-dark/10',
        };

        const sizeStyles = {
            sm: 'px-3 py-1 text-sm',
            md: 'px-5 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        };

        const uniqueShape = 'unique-shape';

        const combinedStyles = clsx(
            'inline-flex items-center justify-center',
            baseStyles,
            uniqueShape,
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
