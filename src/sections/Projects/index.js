import { motion } from 'framer-motion';

export default function Projects() {
    return (
        <section id="projects" className="bg-white px-8 py-20">
            <h2 className="text-center text-4xl font-bold text-gray-900">
                Projects
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((project) => (
                    <motion.div
                        key={project}
                        className="overflow-hidden rounded-lg bg-gray-200 shadow-lg transition hover:shadow-xl"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="h-48 bg-gray-300"></div>{' '}
                        {/* Placeholder for project image */}
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Project {project}
                            </h3>
                            <p className="mt-2 text-gray-700">
                                Brief description of the project.
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
