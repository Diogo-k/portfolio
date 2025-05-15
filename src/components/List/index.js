import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './List.module.css';

/**
 * A list component that renders an ordered or unordered list with custom styling.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the list
 * @param {boolean} ordered - Whether the list is ordered
 * @param {string} className - Additional CSS classes to apply
 * @returns {React.ReactNode} The rendered component
 */
export const List = ({ children, ordered, className, ...props }) => {
    const Element = ordered ? 'ol' : 'ul';

    const listBaseClasses = 'pl-[1.7em] leading-[1.5]';
    const listTypeClasses = ordered ? 'list-decimal' : 'list-none';

    return (
        <Element
            className={clsx(listBaseClasses, listTypeClasses, className)}
            {...props}
        >
            {children}
        </Element>
    );
};

List.propTypes = {
    ordered: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
};

/**
 * A list item component that renders a list item with custom styling.
 *
 * @param {React.ReactNode} children - The content to be rendered inside the list item
 * @param {string} className - Additional CSS classes to apply
 * @returns {React.ReactNode} The rendered component
 */
export const ListItem = ({ children, className, ...props }) => {
    return (
        <li className={clsx(styles.item, className)} {...props}>
            {children}
        </li>
    );
};

ListItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};
