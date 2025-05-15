import clsx from 'clsx';
import styles from './List.module.css';

export const List = ({ ordered, children, className, ...props }) => {
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

export const ListItem = ({ children, className, ...props }) => {
    return (
        <li className={clsx(styles.item, className)} {...props}>
            {children}
        </li>
    );
};
