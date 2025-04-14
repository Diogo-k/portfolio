export default function ProjectPage({ project }) {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            {project.name}
            {project.description}
        </div>
    );
}
