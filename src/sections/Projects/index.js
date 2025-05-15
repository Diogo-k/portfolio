import { getAllDataFromContent } from '@/utils/mdx';
import ProjectsSection from './Projects';

/**
 * Projects section component that displays a list of projects with a pagination system.
 *
 * @param {boolean} isProjectRoute - Whether the section is in the project route
 * @returns {React.ReactNode} The Projects section component
 */
const Projects = async ({ isProjectRoute = false }) => {
    const projects = await getAllDataFromContent('projects');

    const sortedProjects = [...projects].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    return (
        <ProjectsSection
            projects={sortedProjects}
            isProjectRoute={isProjectRoute}
        />
    );
};

Projects.defaultProps = {
    isProjectRoute: false,
};

export default Projects;
