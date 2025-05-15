import { Suspense } from 'react';
import PropTypes from 'prop-types';
import { notFound } from 'next/navigation';
import { Project } from '@/sections';
import { Loading } from '@/components';
import { baseMeta } from '@/utils/meta';
import { getAllSlugsFromContent, getContentData } from '@/utils/mdx';

/**
 * Generates metadata for the project detail page
 *
 * @param {Object} params - The parameters from the URL
 * @returns {Promise<Object>} The generated metadata
 */
export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = await getContentData(slug, 'projects');

    if (!project) {
        notFound();
    }

    return {
        ...baseMeta({
            title: project.name,
            description: project.description,
            ...(project.image && {
                ogImage: project.image,
                twitterImage: project.image,
            }),
        }),
    };
}

/**
 * Generates static parameters for the project detail page
 *
 * @returns {Promise<Array>} An array of slugs
 */
export async function generateStaticParams() {
    const slugs = getAllSlugsFromContent('projects');

    return slugs;
}

/**
 * Project detail page component
 *
 * @param {Object} params - The parameters from the URL
 * @returns {React.ReactNode} The rendered component
 */
export default async function Page({ params }) {
    const { slug } = await params;
    const project = await getContentData(slug, 'projects');

    if (!project) {
        notFound();
    }

    return (
        <Suspense fallback={<Loading />}>
            <Project project={project} />
        </Suspense>
    );
}

Page.propTypes = {
    params: PropTypes.object.isRequired,
};
