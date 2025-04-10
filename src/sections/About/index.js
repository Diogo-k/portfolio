'use client';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { motion } from 'framer-motion';

import {
    SiReact,
    SiJavascript,
    SiTypescript,
    SiHtml5,
    SiCss,
    SiNextdotjs,
    SiRedux,
    SiReactquery,
    SiTailwindcss,
    SiFramer,
    SiNodedotjs,
    SiExpress,
    SiGraphql,
    SiMongodb,
    SiMysql,
    SiGit,
    SiDocker,
    SiWebpack,
    SiPnpm,
    SiAmazonwebservices,
    SiVercel,
    SiNetlify,
    SiHeroku,
} from '@icons-pack/react-simple-icons';

import { Text, Tag, Button } from '@/components';

import SkydiveImage from '../../../public/me_skydive.jpeg';

const skills = [
    // Core & Frontend (Red)
    { name: 'JavaScript', variant: 'frontend', icon: SiJavascript },
    { name: 'TypeScript', variant: 'frontend', icon: SiTypescript },
    { name: 'HTML5', variant: 'frontend', icon: SiHtml5 },
    { name: 'CSS/Sass', variant: 'frontend', icon: SiCss },
    { name: 'React.js', variant: 'frontend', icon: SiReact },
    { name: 'Next.js', variant: 'frontend', icon: SiNextdotjs },
    { name: 'React Native', variant: 'frontend', icon: SiReact },
    { name: 'Redux', variant: 'frontend', icon: SiRedux },
    { name: 'React Query', variant: 'frontend', icon: SiReactquery },
    { name: 'Tailwind CSS', variant: 'frontend', icon: SiTailwindcss },
    { name: 'Framer Motion', variant: 'frontend', icon: SiFramer },

    // Backend (Blue)
    { name: 'Node.js', variant: 'backend', icon: SiNodedotjs },
    { name: 'Express', variant: 'backend', icon: SiExpress },
    { name: 'GraphQL', variant: 'backend', icon: SiGraphql },

    // Databases (Green)
    { name: 'MongoDB', variant: 'database', icon: SiMongodb },
    { name: 'SQL', variant: 'database', icon: SiMysql },

    // Development Tools (Purple)
    { name: 'Git', variant: 'tools', icon: SiGit },
    { name: 'Docker', variant: 'tools', icon: SiDocker },
    { name: 'Webpack', variant: 'tools', icon: SiWebpack },
    { name: 'PNPM', variant: 'tools', icon: SiPnpm },

    // Cloud & Deployment (Orange)
    { name: 'AWS', variant: 'cloud', icon: SiAmazonwebservices },
    { name: 'Vercel', variant: 'cloud', icon: SiVercel },
    { name: 'Netlify', variant: 'cloud', icon: SiNetlify },
    { name: 'Heroku', variant: 'cloud', icon: SiHeroku },
];

const aboutMeParagraphs = [
    "Hey, I'm <span class='font-bold text-primary-light dark:text-accent-dark'>João Diogo Paulo</span>, a <span class='font-bold text-primary-light dark:text-accent-dark'>Frontend Developer</span> from Lisbon who enjoys crafting clean, efficient, and user-focused digital experiences. I work mostly with <span class='font-bold text-primary-light dark:text-primary-dark'>React</span>, <span class='font-bold text-primary-light dark:text-primary-dark'>Next.js</span>, and <span class='font-bold text-primary-light dark:text-primary-dark'>React Native</span>, and I'm all about building scalable, maintainable solutions that make life easier for users and teams.",
    "Over the years, I've helped recraft legacy platforms, launch eCommerce sites, and build custom tools for industries like banking, real estate, pharma, and even forest conservation. I love turning complex ideas into smooth, performant interfaces that just work.",
    "Outside of coding, I'm into <span class='font-bold text-primary-light dark:text-accent-dark'>Video games</span> 🎮 <span class='font-bold text-primary-light dark:text-accent-dark'>Anime</span> 📺 and more recently <span class='font-bold text-primary-light dark:text-accent-dark'>Game Development</span> 💻 as a hobby. I'm always looking for new challenges to grow whether that's <span class='font-semibold'>diving into a new framework or jumping out of a plane</span> 🪂 just to push myself.",
    '<span class="font-bold text-primary-light dark:text-accent-dark">That mindset drives how I learn, build, and collaborate!</span>',
    "Always open to cool ideas and new projects let's connect.",
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

/**
 * Skills component that displays a grid of skill tags with animations
 */
const Skills = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        className="flex flex-wrap gap-2 overflow-hidden"
        role="list"
        aria-label="Technical skills list"
    >
        {skills.map((skill) => (
            <Tag
                key={skill.name}
                variant={skill.variant}
                icon={skill.icon}
                className="transition-all duration-300 hover:scale-105"
                role="listitem"
                aria-label={`${skill.name} skill`}
            >
                {skill.name}
            </Tag>
        ))}
    </motion.div>
);

Skills.propTypes = {
    skills: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            variant: PropTypes.oneOf([
                'frontend',
                'backend',
                'database',
                'tools',
                'cloud',
            ]).isRequired,
        })
    ),
};

/**
 * ProfileImage component with error handling and loading state
 */
const ProfileImage = () => {
    return (
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary-light/20 sm:h-[350px] md:h-[400px] dark:hover:shadow-primary-dark/20">
            <motion.div
                className="relative h-full w-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <Image
                    alt="Diogo Paulo - Frontend Developer"
                    src={SkydiveImage}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={50}
                    placeholder="blur"
                    loading="lazy"
                />
            </motion.div>
        </div>
    );
};

ProfileImage.propTypes = {};

/**
 * About section component that displays personal information and skills
 */
export default function About() {
    const MotionButton = motion.create(Button);

    return (
        <section
            id="about-me"
            className="mx-auto flex min-h-[50vh] max-w-5xl flex-col overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
            aria-labelledby="about-heading"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Text
                    as="h1"
                    size="text-4xl"
                    responsiveSize={{
                        sm: 'text-5xl',
                    }}
                    weight="font-bold"
                    className="mb-8 sm:mb-12"
                    id="about-heading"
                    role="heading"
                    aria-label="About me section"
                >
                    About Me
                </Text>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true, margin: '-10px' }}
                    className="flex flex-col gap-4 sm:gap-6"
                >
                    <Text
                        as="h2"
                        size="text-xl"
                        responsiveSize={{
                            sm: 'text-2xl',
                        }}
                        weight="font-bold"
                        className="mb-3 sm:mb-4"
                        id="about-intro-heading"
                        role="heading"
                        aria-label="Get to know me section"
                    >
                        Get to know me!
                    </Text>
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {aboutMeParagraphs.map((paragraph, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                            >
                                <Text
                                    id={`about-paragraph-${index}`}
                                    role="article"
                                    size="text-sm"
                                    responsiveSize={{
                                        sm: 'text-base',
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: paragraph,
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                    <MotionButton
                        as="a"
                        href="/Joao_Paulo_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="md"
                        variant="primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-2 w-fit"
                        aria-label="View CV in new tab"
                    >
                        View CV
                    </MotionButton>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true, margin: '-10px' }}
                    className="flex flex-col gap-6 sm:gap-8"
                >
                    <ProfileImage />
                    <Text
                        as="h2"
                        size="text-xl"
                        responsiveSize={{
                            sm: 'text-2xl',
                        }}
                        weight="font-bold"
                        id="skills-heading"
                        role="heading"
                        aria-label="Technical skills section"
                    >
                        My Skills
                    </Text>
                    <Skills />
                </motion.div>
            </div>
        </section>
    );
}

About.propTypes = {};
