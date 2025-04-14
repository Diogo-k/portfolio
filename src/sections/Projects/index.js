import { getAllDataFromContent } from '@/utils/mdx';

import ProjectsClient from './client';

export default async function Projects({ entirePage = false }) {
    const projects = await getAllDataFromContent('projects');

    return <ProjectsClient projects={projects} entirePage={entirePage} />;
}
