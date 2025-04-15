import clsx from 'clsx';
import PropTypes from 'prop-types';

/**
 * Text component that displays a text with a size, responsive size, weight, align, and class name.
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content of the text
 * @param {string} props.size - The size of the text
 * @returns {React.ReactNode} The rendered component
 */
export default function Text({
    as: Component = 'span',
    size = 'base',
    responsiveSize,
    weight = 'normal',
    align = 'start',
    className = '',
    children,
    id,
    role,
    'aria-label': ariaLabel,
    ...props
}) {
    const getResponsiveSize = () => {
        if (!responsiveSize) return size;

        const { sm, md, lg, xl, '2xl': twoXl } = responsiveSize;
        return clsx(
            size,
            sm && `sm:${sm}`,
            md && `md:${md}`,
            lg && `lg:${lg}`,
            xl && `xl:${xl}`,
            twoXl && `2xl:${twoXl}`
        );
    };

    return (
        <Component
            className={clsx(
                `${getResponsiveSize()} ${align} ${weight} text-text-light dark:text-text-dark`,
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
    size: PropTypes.oneOf([
        'xs',
        'sm',
        'base',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
    ]),
    responsiveSize: PropTypes.shape({
        sm: PropTypes.oneOf([
            'xs',
            'sm',
            'base',
            'lg',
            'xl',
            '2xl',
            '3xl',
            '4xl',
            '5xl',
        ]),
        md: PropTypes.oneOf([
            'xs',
            'sm',
            'base',
            'lg',
            'xl',
            '2xl',
            '3xl',
            '4xl',
            '5xl',
        ]),
        lg: PropTypes.oneOf([
            'xs',
            'sm',
            'base',
            'lg',
            'xl',
            '2xl',
            '3xl',
            '4xl',
            '5xl',
        ]),
        xl: PropTypes.oneOf([
            'xs',
            'sm',
            'base',
            'lg',
            'xl',
            '2xl',
            '3xl',
            '4xl',
            '5xl',
        ]),
        '2xl': PropTypes.oneOf([
            'xs',
            'sm',
            'base',
            'lg',
            'xl',
            '2xl',
            '3xl',
            '4xl',
            '5xl',
        ]),
    }),
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
    responsiveSize: null,
    weight: 'normal',
    align: 'start',
    className: '',
};
