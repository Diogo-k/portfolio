import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import calculateReadingTime from '@/utils/readingTime';

/**
 * Get the content directory for a given content type
 *
 * @param {string} contentType - The content type
 * @returns {string} The content directory
 */
function getContentDirectory(contentType) {
    return path.join(process.cwd(), `src/content/${contentType}`);
}

/**
 * Get all slugs from a content type
 *
 * @param {string} contentType - The content type
 * @returns {Array} An array of slugs
 */
export function getAllSlugsFromContent(contentType) {
    const contentDirectory = getContentDirectory(contentType);

    if (!fs.existsSync(contentDirectory)) {
        console.warn(`❌ Content directory not found: ${contentDirectory}`);
        return [];
    }

    const slugs = fs.readdirSync(contentDirectory);

    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ''),
    }));
}

/**
 * Get all data from selected content with metadata
 *
 * @param {string} contentType - The content type
 * @returns {Array} An array of content data
 */
export function getAllDataFromContent(contentType) {
    const contentDirectory = getContentDirectory(contentType);

    if (!fs.existsSync(contentDirectory)) {
        console.warn(`❌ Content directory not found: ${contentDirectory}`);
        return [];
    }

    const fileNames = fs.readdirSync(contentDirectory);

    const allContentData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');

        const fullPath = path.join(contentDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const { data } = matter(fileContents);

        return {
            slug,
            ...data,
        };
    });

    return allContentData;
}

/**
 * Get a content data from selected content by slug
 *
 * @param {string} slug - The slug of the content
 * @param {string} contentType - The content type
 * @returns {Object} The content data
 */
export async function getContentData(slug, contentType) {
    const contentDirectory = getContentDirectory(contentType);

    const fullPath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        console.warn(`❌ Content file not found: ${fullPath}`);
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug],
            format: 'mdx',
        },
    });

    return {
        slug,
        ...data,
        source: mdxSource,
        readingTime: calculateReadingTime(content),
    };
}
