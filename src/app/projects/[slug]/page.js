import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import PropTypes from 'prop-types';
import { Project } from '@/sections';
import { Loading } from '@/components';
import { getAllSlugsFromContent, getContentData } from '@/utils/mdx';

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
