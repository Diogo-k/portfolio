'use client';

import { motion } from 'framer-motion';

import { Text } from '@/components';

export default function Projects() {
    return (
        <section
            id="projects"
            className="mx-auto flex h-screen max-w-7xl flex-col items-center justify-center"
        >
            <h2 className="text-center text-4xl font-bold text-gray-900">
                Projects
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((project) => (
                    <motion.div
                        key={project}
                        className="overflow-hidden rounded-lg"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="h-48 w-72 bg-accent-light"></div>
                        <div className="p-4">
                            <Text as="h1" size="text-xl" weight="font-semibold">
                                Hitachi UBS
                            </Text>
                            <Text as="p">Creator</Text>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
