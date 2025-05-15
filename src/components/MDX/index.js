'use client';

import PropTypes from 'prop-types';
import { MDXRemote } from 'next-mdx-remote';
import { components } from './MDXMarkdown';

/**
 * A component that renders MDX content with custom components.
 *
 * @param {Object} props - The component props
 * @returns {React.ReactNode} The rendered component
 */
const MDX = (props) => {
    return <MDXRemote {...props} components={components} />;
};

MDX.propTypes = {
    children: PropTypes.node,
};

export default MDX;
