import { notFound } from 'next/navigation';

import ProjectPage from '../../../sections/Projects/[slug]';

import { getAllSlugsFromContent, getContentData } from '@/utils/mdx';

export async function generateStaticParams() {
    const slugs = getAllSlugsFromContent('projects');

    return slugs;
}

export default async function Page({ params }) {
    const { slug } = await params;
    const project = await getContentData(slug, 'projects');

    if (!project) {
        notFound();
    }

    return <ProjectPage project={project} />;
}
