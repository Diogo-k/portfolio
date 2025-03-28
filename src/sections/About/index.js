'use client';

import { motion } from 'framer-motion';

import { Text, Tag, Button } from '@/components';

const skills = ['HTML', 'CSS', 'JavaScript', 'React'];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export default function About() {
    const MotionButton = motion.create(Button);

    return (
        <section
            id="about-me"
            className="mx-auto flex min-h-[50vh] max-w-5xl flex-col py-28"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Text
                    as="h1"
                    size="text-5xl"
                    weight="font-bold"
                    className="mb-12"
                    id="about-heading"
                    role="heading"
                    aria-label="About me section"
                >
                    About me
                </Text>
            </motion.div>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Text
                        as="h2"
                        size="text-2xl"
                        weight="font-bold"
                        className="mb-8"
                        id="about-intro-heading"
                        role="heading"
                        aria-label="Get to know me section"
                    >
                        Get to know me!
                    </Text>
                    <div className="flex flex-col gap-4">
                        <Text
                            id="about-description"
                            role="article"
                            aria-label="Personal introduction"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </Text>
                    </div>
                    <MotionButton
                        as="a"
                        href="#contact"
                        size="md"
                        variant="primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4"
                    >
                        Download CV
                    </MotionButton>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <Text
                        as="h2"
                        size="text-2xl"
                        weight="font-bold"
                        className="mb-8"
                        id="skills-heading"
                        role="heading"
                        aria-label="Skills section"
                    >
                        My Skills
                    </Text>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        className="flex flex-wrap gap-3"
                    >
                        {skills.map((skill) => (
                            <Tag key={skill}>{skill}</Tag>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
