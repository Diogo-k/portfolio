import { Children } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import clsx from 'clsx';
import { Text, Link, List, ListItem, Code } from '@/components';

const HeadingLink = ({ id, size }) => {
    const baseStyles =
        'stroke-current text-primary-light hover:text-accent-light dark:text-red-500 dark:hover:text-accent-dark';
    const sizeStyles = {
        h1: 'size-8',
        h2: 'size-7',
        h3: 'size-6',
    };
    const topStyles = {
        h1: 'top-[0.5em]',
        h2: 'top-[0.6em]',
        h3: 'top-[0.7em]',
    };

    return (
        <NextLink
            href={`#${id}`}
            aria-label="Link to heading"
            className={clsx(
                'opacity-1 absolute left-[-10px] top-[0.5em] hidden -translate-x-full -translate-y-1/2 p-2 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-light md:block md:p-0 dark:focus-visible:outline-text-dark',
                topStyles[size]
            )}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
                className={clsx(baseStyles, sizeStyles[size])}
            >
                <g>
                    <path
                        d="M12.7917 15.7991L14.2223 14.3676C16.5926 11.9959 16.5926 8.15054 14.2223 5.7788C11.8521 3.40707 8.0091 3.40707 5.63885 5.7788L2.77769 8.64174C0.407436 11.0135 0.407436 14.8588 2.77769 17.2306C3.87688 18.3304 5.29279 18.9202 6.73165 19"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path
                        opacity="0.5"
                        d="M11.2083 8.20092L9.77769 9.63239C7.40744 12.0041 7.40744 15.8495 9.77769 18.2212C12.1479 20.5929 15.9909 20.5929 18.3612 18.2212L21.2223 15.3583C23.5926 12.9865 23.5926 9.14118 21.2223 6.76945C20.1231 5.66957 18.7072 5.07976 17.2683 5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </g>
            </svg>
        </NextLink>
    );
};

const H1 = ({ children, ...props }) => {
    return (
        <Text
            as="h1"
            size="text-4xl"
            weight="font-bold"
            className="group relative my-6"
            {...props}
        >
            <HeadingLink id={props.id} size="h1" />
            {children}
        </Text>
    );
};

const H2 = ({ children, ...props }) => {
    return (
        <Text
            as="h2"
            size="text-3xl"
            weight="font-bold"
            className="group relative my-6"
            {...props}
        >
            <HeadingLink id={props.id} size="h2" />
            {children}
        </Text>
    );
};

const H3 = ({ children, ...props }) => (
    <Text
        as="h3"
        size="text-2xl"
        weight="font-bold"
        className="group relative my-6"
        {...props}
    >
        <HeadingLink id={props.id} size="h3" />
        {children}
    </Text>
);

const H4 = ({ children, ...props }) => (
    <Text
        as="h4"
        size="text-xl"
        weight="font-bold"
        className="group relative my-6"
        {...props}
    >
        {children}
    </Text>
);

const H5 = ({ children, ...props }) => (
    <Text
        as="h5"
        size="text-lg"
        weight="font-bold"
        className="group relative my-6"
        {...props}
    >
        {children}
    </Text>
);

const H6 = ({ children, ...props }) => (
    <Text
        as="h6"
        size="text-base"
        weight="font-bold"
        className="group relative my-6"
        {...props}
    >
        {children}
    </Text>
);

const Paragraph = ({ children }) => {
    const hasSingleChild = Children.count(children) === 1;
    const firstChild = Children.toArray(children)[0];

    // Prevent `img` being wrapped in `p`
    if (hasSingleChild && firstChild.type === Image) {
        return children;
    }

    return (
        <Text size="text-lg" as="p" className="my-6 leading-relaxed">
            {children}
        </Text>
    );
};

const Strong = (props) => {
    return <strong className="font-bold" {...props} />;
};

const MDLink = ({ children, ...props }) => {
    const isExternal =
        props.href.startsWith('http') || props.href.endsWith('.pdf');

    return (
        <Link
            variant="inline"
            href={props.href}
            isExternal={isExternal}
            className="text-primary-light hover:text-accent-light dark:text-red-500 dark:hover:text-accent-dark"
            {...props}
        >
            {children}
        </Link>
    );
};

const Ul = (props) => {
    return <List ordered={false} {...props} />;
};

const Ol = (props) => {
    return <List ordered={true} {...props} />;
};

const Li = ({ children, ...props }) => {
    return <ListItem {...props}>{children}</ListItem>;
};

const Input = ({ ...props }) => {
    if (props.type === 'checkbox' && props.disabled) {
        return (
            <input
                type="checkbox"
                className={`mr-2 size-4 rounded border-muted-light align-middle dark:border-muted-dark ${props.className}`}
                checked={props.checked}
                disabled={props.disabled}
            />
        );
    }

    return <input {...props} />;
};

const Blockquote = (props) => {
    return (
        <blockquote
            className="my-6 border-l-4 border-primary-light py-2 pl-4 italic text-gray-700 dark:border-primary-dark dark:text-gray-400"
            {...props}
        />
    );
};

const Hr = (props) => {
    return (
        <hr
            className="my-8 border-muted-light dark:border-muted-dark"
            {...props}
        />
    );
};

const Pre = ({ children, ...props }) => {
    return <pre {...props}>{children}</pre>;
};

const MDCode = ({ children, ...props }) => {
    if (props.className && props.className.startsWith('language-')) {
        return (
            <Code language={props.className} {...props}>
                {children}
            </Code>
        );
    }

    return (
        <code
            className="mx-0.5 rounded-md bg-surface-light px-1.5 py-0.5 font-mono text-sm text-primary-light dark:bg-surface-dark dark:text-red-500"
            {...props}
        >
            {children}
        </code>
    );
};

const Table = (props) => (
    <div className="my-6 overflow-x-auto">
        <table
            className="w-full border-collapse border border-muted-light text-left dark:border-muted-dark"
            {...props}
        />
    </div>
);

const Thead = (props) => (
    <thead className="bg-primary-light dark:bg-primary-dark" {...props} />
);

const Tbody = (props) => <tbody {...props} />;

const Tr = (props) => (
    <tr
        className="border-b border-muted-light dark:border-muted-dark"
        {...props}
    />
);

const Th = (props) => (
    <th
        className="border-r border-muted-light p-3 text-sm font-semibold text-white last:border-r-0 dark:border-muted-dark dark:text-white"
        {...props}
    />
);

const Td = (props) => (
    <td
        className="border-r border-muted-light p-3 text-sm last:border-r-0 dark:border-muted-dark"
        {...props}
    />
);

const MDImage = ({ src, ...props }) => {
    return (
        <Image
            src={src}
            loading="lazy"
            alt={props.alt}
            width={1920}
            height={1080}
            className="h-auto w-full rounded-md"
            {...props}
        />
    );
};

const Embed = ({ src }) => {
    return (
        <div className="my-6">
            <iframe
                src={src}
                loading="lazy"
                title="Embed"
                className="aspect-video w-full rounded-md shadow-md"
                allowFullScreen
            />
        </div>
    );
};

/**
 * @typedef {Object} MDXComponents
 * @property {React.ComponentType<any>} h1 - Renders an H1 heading with a link.
 * @property {React.ComponentType<any>} h2 - Renders an H2 heading with a link.
 * @property {React.ComponentType<any>} h3 - Renders an H3 heading with a link.
 * @property {React.ComponentType<any>} h4 - Renders an H4 heading.
 * @property {React.ComponentType<any>} h5 - Renders an H5 heading.
 * @property {React.ComponentType<any>} h6 - Renders an H6 heading.
 * @property {React.ComponentType<any>} p - Renders a paragraph, preventing image wrapping.
 * @property {React.ComponentType<any>} strong - Renders bold text.
 * @property {React.ComponentType<any>} a - Renders a link, handling external links.
 * @property {React.ComponentType<any>} ul - Renders an unordered list.
 * @property {React.ComponentType<any>} ol - Renders an ordered list.
 * @property {React.ComponentType<any>} li - Renders a list item.
 * @property {React.ComponentType<any>} input - Renders an input element, with special handling for disabled checkboxes.
 * @property {React.ComponentType<any>} blockquote - Renders a blockquote.
 * @property {React.ComponentType<any>} hr - Renders a horizontal rule.
 * @property {React.ComponentType<any>} pre - Renders preformatted text.
 * @property {React.ComponentType<any>} code - Renders inline or block code, handling syntax highlighting classes.
 * @property {React.ComponentType<any>} table - Renders a table.
 * @property {React.ComponentType<any>} thead - Renders a table header.
 * @property {React.ComponentType<any>} tbody - Renders a table body.
 * @property {React.ComponentType<any>} tr - Renders a table row.
 * @property {React.ComponentType<any>} th - Renders a table header cell.
 * @property {React.ComponentType<any>} td - Renders a table data cell.
 * @property {React.ComponentType<any>} img - Renders an image using Next.js Image component.
 * @property {React.ComponentType<any>} Embed - Renders an embedded iframe.
 */

/**
 * Custom components to be used with MDX for rendering various HTML elements
 * with custom styling and functionality. These components provide a consistent
 * look and feel across the application's markdown content.
 * @type {MDXComponents}
 */
export const components = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    p: Paragraph,
    strong: Strong,
    a: MDLink,
    ul: Ul,
    ol: Ol,
    li: Li,
    input: Input,
    blockquote: Blockquote,
    hr: Hr,
    pre: Pre,
    code: MDCode,
    table: Table,
    thead: Thead,
    tbody: Tbody,
    tr: Tr,
    th: Th,
    td: Td,
    img: MDImage,
    Embed,
};
