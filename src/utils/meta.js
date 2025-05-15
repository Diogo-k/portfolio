import config from '@/config';

const { name, url } = config;
const defaultOgImage = `/social_image.png`;

/**
 * Base meta tags for the website
 *
 * @param {string} prefix - The prefix for the title
 * @param {string} title - The title for the page
 * @param {string} description - The description for the page
 * @param {string} ogImage - The image for the open graph
 * @returns {Object} The base meta tags
 */
export function baseMeta({
    prefix = name,
    title,
    description,
    ogImage = defaultOgImage,
    twitterImage = ogImage,
}) {
    const titleText = [prefix, title].filter(Boolean).join(' | ');

    return {
        metadataBase: new URL(url),
        title: titleText,
        description,
        keywords: [
            'portfolio',
            'software developer',
            'web development',
            'frontend',
            'backend',
            'full stack',
        ],
        authors: [{ name }],
        creator: name,
        publisher: name,
        openGraph: {
            type: 'website',
            locale: 'en_US',
            url,
            siteName: titleText,
            title: titleText,
            description,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 675,
                    alt: 'Banner for the site',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            creator: name,
            site: url,
            title: titleText,
            description,
            images: [twitterImage],
        },
    };
}
