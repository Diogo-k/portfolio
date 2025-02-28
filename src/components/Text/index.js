import clsx from 'clsx';

export default function Text({
    as: Component = 'span',
    size = 'base',
    weight = 'normal',
    align = 'start',
    className = '',
    children,
    ...props
}) {
    return (
        <Component
            className={clsx(
                `text-${size} text-${align} font-${weight} text-text-light dark:text-text-dark`,
                'transition-colors duration-200',
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}
