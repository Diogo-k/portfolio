'use client';

import PropTypes from 'prop-types';
import { motion } from 'motion/react';

import { Text, Button, ProfileImage, Skills } from '@/components';

import { RightArrow } from '@/assets';

import { ANIMATION_VARIANTS } from './animation';

const MotionButton = motion.create(Button);

/**
 * About section component that displays personal information and skills
 *
 * @param {Object} props - Component props
 * @param {Object} props.about - About data
 * @returns {JSX.Element} The About section component
 */
export default function About({ about }) {
    const { aboutMe, skills } = about;

    return (
        <section
            id="about-me"
            className="mx-auto flex min-h-[50vh] max-w-5xl flex-col overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
            aria-label="About me section"
            role="banner"
        >
            <motion.div
                variants={ANIMATION_VARIANTS.heading}
                initial="initial"
                whileInView="whileInView"
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
                    aria-label="About me section"
                    role="heading"
                >
                    About Me
                </Text>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
                <motion.div
                    variants={ANIMATION_VARIANTS.column}
                    initial="initial"
                    whileInView="whileInView"
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
                        id="about-intro-heading"
                        role="heading"
                        aria-label="Get to know me section"
                    >
                        Get to know me!
                    </Text>
                    <div className="flex flex-col gap-3 sm:gap-4">
                        {aboutMe.map((paragraph, index) => (
                            <motion.div
                                key={index}
                                variants={ANIMATION_VARIANTS.paragraphs}
                                initial="initial"
                                whileInView="whileInView"
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2 + index * 0.1,
                                }}
                                viewport={{ once: true }}
                            >
                                <Text
                                    size="text-sm"
                                    responsiveSize={{
                                        md: 'text-base',
                                    }}
                                    id={`about-paragraph-${index}`}
                                    role="article"
                                    dangerouslySetInnerHTML={{
                                        __html: paragraph,
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                    <MotionButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        as="a"
                        href="/joao_diogo_paulo_resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        size="md"
                        variant="primary"
                        className="w-fit"
                        aria-label="View CV (joao_diogo_paulo_resume.pdf) in new tab"
                    >
                        View CV
                        <RightArrow
                            className="ml-1 size-4"
                            aria-hidden="true"
                        />
                    </MotionButton>
                </motion.div>

                <motion.div
                    variants={ANIMATION_VARIANTS.column}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: '-10px' }}
                    className="flex flex-col gap-4 sm:gap-6"
                >
                    <ProfileImage />
                    <Text
                        as="h2"
                        size="text-xl"
                        responsiveSize={{
                            sm: 'text-2xl',
                        }}
                        weight="font-bold"
                        align="text-center"
                        id="skills-heading"
                        role="heading"
                        aria-label="Technical skills section"
                    >
                        My Skills
                    </Text>
                    <Skills skills={skills} />
                </motion.div>
            </div>
        </section>
    );
}

About.propTypes = {
    about: PropTypes.shape({
        aboutMe: PropTypes.arrayOf(PropTypes.string).isRequired,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};
