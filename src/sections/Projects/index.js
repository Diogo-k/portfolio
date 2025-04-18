import { getAllDataFromContent } from '@/utils/mdx';

import ProjectsClient from './client';

export default async function Projects({ isProjectRoute = false }) {
    const projects = await getAllDataFromContent('projects');

    const sortedProjects = [...projects].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    return (
        <ProjectsClient
            projects={sortedProjects}
            isProjectRoute={isProjectRoute}
        />
    );
}
