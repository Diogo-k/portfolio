import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { Project } from '@/sections';
import { Loading } from '@/components';

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

    return (
        <Suspense fallback={<Loading />}>
            <Project project={project} />
        </Suspense>
    );
}
