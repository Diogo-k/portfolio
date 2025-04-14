import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

function getContentDirectory(contentType) {
    return path.join(process.cwd(), `src/content/${contentType}`);
}

// Get all slugs from a content type
export function getAllSlugsFromContent(contentType) {
    const contentDirectory = getContentDirectory(contentType);

    if (!fs.existsSync(contentDirectory)) {
        console.warn(`❌ Content directory not found: ${contentDirectory}`);
        return [];
    }

    const fileNames = fs.readdirSync(contentDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                slug: fileName.replace(/\.mdx$/, ''),
            },
        };
    });
}

// Get all data from selected content with metadata
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

// Get a content data from selected content by slug
export async function getContentData(slug, contentType) {
    const contentDirectory = getContentDirectory(contentType);

    const fullPath = path.join(contentDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        console.warn(`❌ Content file not found: ${fullPath}`);
        return {
            slug,
            mdxSource: null,
            notFound: true,
        };
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data, content } = matter(fileContents);

    const mdxSource = await serialize(content);

    return {
        slug,
        mdxSource,
        ...data,
    };
}

// Get a specific MDX content by slug
export async function getSpecificMDXContent(mdxSlug) {
    const contentDirectory = path.join(process.cwd(), `src/content`);

    const fullPath = path.join(contentDirectory, `${mdxSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        console.warn(`❌ Content file not found: ${fullPath}`);
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const { data } = matter(fileContents);

    return {
        ...data,
    };
}
