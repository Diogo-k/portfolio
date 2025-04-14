import PropTypes from 'prop-types';
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

import { Tag } from '@/components';

import { ANIMATION_VARIANTS } from './animation';

const skillIconMap = {
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    HTML5: SiHtml5,
    'CSS/Sass': SiCss,
    'React.js': SiReact,
    'Next.js': SiNextdotjs,
    'React Native': SiReact,
    Redux: SiRedux,
    'React Query': SiReactquery,
    'Tailwind CSS': SiTailwindcss,
    'Framer Motion': SiFramer,
    'Node.js': SiNodedotjs,
    Express: SiExpress,
    GraphQL: SiGraphql,
    MongoDB: SiMongodb,
    SQL: SiMysql,
    Git: SiGit,
    Docker: SiDocker,
    Webpack: SiWebpack,
    PNPM: SiPnpm,
    AWS: SiAmazonwebservices,
    Vercel: SiVercel,
    Netlify: SiNetlify,
    Heroku: SiHeroku,
};

/**
 * Skills component that displays a grid of skill tags with animations
 * @param {Object} props - The component props
 */
const Skills = ({ skills }) => {
    return (
        <motion.div
            variants={ANIMATION_VARIANTS.container}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 overflow-hidden"
            aria-label="Technical skills list"
            role="list"
        >
            {skills.map((skill) => {
                const IconComponent = skillIconMap[skill.name] || null;
                return (
                    <motion.div
                        key={skill.name}
                        role="listitem"
                        aria-label={`${skill.name} skill`}
                    >
                        <Tag
                            variant={skill.variant}
                            icon={IconComponent}
                            className="transition-all duration-300 hover:scale-105"
                        >
                            {skill.name}
                        </Tag>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

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

export default Skills;
