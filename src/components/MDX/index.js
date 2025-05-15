'use client';

import { MDXRemote } from 'next-mdx-remote';
import { components } from './MDXMarkdown';

export default function MDX(props) {
    return <MDXRemote {...props} components={components} />;
}
