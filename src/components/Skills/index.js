import PropTypes from 'prop-types';
import * as motion from 'motion/react-client';

import {
    // Frontend
    SiJavascript,
    SiTypescript,
    SiHtml5,
    SiCss,
    SiReact,
    SiNextdotjs,
    SiExpo,
    SiRedux,
    SiReactquery,
    SiTailwindcss,
    SiStorybook,
    SiJest,
    SiTestinglibrary,
    // Backend
    SiRust,
    SiNodedotjs,
    SiExpress,
    SiMongoose,
    SiRedis,
    SiGraphql,
    SiMongodb,
    SiPostgresql,
    SiSqlite,
    // Others
    SiGit,
    SiVite,
    SiWebpack,
    SiBabel,
    SiNpm,
    SiPnpm,
    SiEslint,
    SiPrettier,
    SiAmazonwebservices,
    SiVercel,
    SiJenkins,
    SiStripe,
    SiAdyen,
    SiJira,
    SiConfluence,
} from '@icons-pack/react-simple-icons';

import { Tag } from '@/components';

const skillIconMap = {
    // Frontend
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    HTML: SiHtml5,
    CSS: SiCss,
    'React.js': SiReact,
    'Next.js': SiNextdotjs,
    'React Native': SiReact,
    Expo: SiExpo,
    Redux: SiRedux,
    Tanstack: SiReactquery,
    'Tailwind CSS': SiTailwindcss,
    Storybook: SiStorybook,
    Jest: SiJest,
    'React Testing Library': SiTestinglibrary,
    // Backend
    Rust: SiRust,
    'Node.js': SiNodedotjs,
    Express: SiExpress,
    Mongoose: SiMongoose,
    Redis: SiRedis,
    GraphQL: SiGraphql,
    MongoDB: SiMongodb,
    PostgreSQL: SiPostgresql,
    SQLite: SiSqlite,
    // Others
    Git: SiGit,
    Vite: SiVite,
    Webpack: SiWebpack,
    Babel: SiBabel,
    NPM: SiNpm,
    PNPM: SiPnpm,
    ESLint: SiEslint,
    Prettier: SiPrettier,
    Vercel: SiVercel,
    Jenkins: SiJenkins,
    AWS: SiAmazonwebservices,
    Stripe: SiStripe,
    Adyen: SiAdyen,
    Jira: SiJira,
    Confluence: SiConfluence,
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
