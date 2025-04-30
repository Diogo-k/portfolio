import PropTypes from 'prop-types';
import * as motion from 'motion/react-client';

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

const skillIconMap = {
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    HTML5: SiHtml5,
    CSS: SiCss,
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
 * @param {Array} props.skills - The skills to display
 * @param {Object} props - The component props
 * @returns {React.ReactNode} The rendered component
 */
const Skills = ({ skills, ...props }) => {
    return (
        <motion.div
            role="list"
            aria-label="Technical skills list"
            className="flex flex-wrap justify-center gap-2 overflow-hidden"
            {...props}
        >
            {skills.map((skill) => {
                const IconComponent = skillIconMap[skill.name] || null;
                return (
                    <motion.div
                        key={skill.name}
                        role="listitem"
                        aria-label={`${skill.name} skill`}
                    >
                        <Tag variant="ghost" icon={IconComponent}>
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
    ).isRequired,
};

export default Skills;
