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
                `${size} ${align} ${weight} text-text-light dark:text-text-dark`,
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}
