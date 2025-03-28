import clsx from 'clsx';
import PropTypes from 'prop-types';

export default function Text({
    as: Component = 'span',
    size = 'base',
    weight = 'normal',
    align = 'start',
    className = '',
    children,
    id,
    role,
    'aria-label': ariaLabel,
    ...props
}) {
    return (
        <Component
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
        </Component>
    );
}

Text.propTypes = {
    as: PropTypes.elementType,
    size: PropTypes.oneOf(['xs', 'sm', 'base', 'lg', 'xl', '2xl']),
    weight: PropTypes.oneOf(['light', 'normal', 'medium', 'semibold', 'bold']),
    align: PropTypes.oneOf(['start', 'center', 'end', 'justify']),
    className: PropTypes.string,
    children: PropTypes.node,
    id: PropTypes.string,
    role: PropTypes.string,
    'aria-label': PropTypes.string,
};

Text.defaultProps = {
    as: 'span',
    size: 'base',
    weight: 'normal',
    align: 'start',
    className: '',
};
