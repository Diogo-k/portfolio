import { getAllDataFromContent } from '@/utils/mdx';

import ProjectsClient from './client';

export default async function Projects({ entirePage = false }) {
    const projects = await getAllDataFromContent('projects');

    // Sort projects by date in descending order (newest first)
    const sortedProjects = [...projects].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    return <ProjectsClient projects={sortedProjects} entirePage={entirePage} />;
}
