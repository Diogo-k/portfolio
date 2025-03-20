'use client';

import { motion } from 'framer-motion';

import { Text } from '@/components';
import { Katana } from '@/assets';

const experiences = [
    {
        role: 'Frontend Developer @ Xpand IT',
        duration: 'May 2022 - Present',
        list: [
            'Developed and contributed to a cutting-edge platform designed to efficiently manage and report archive migrations from various legacy platforms to a centralized repository.',
        ],
    },
    {
        role: 'Frontend Developer @ Cottonhat',
        duration: 'April 2019 - May 2022',
        list: [
            'Worked with a variety of different languages, frameworks, and DevOps tools such as JavaScript, TypeScript, React, React Native, Redux, Next.js, Docker etc…',
            'Crafted a Loyalty Mobile Application using React Native, Expo and also integrated with client API',
            'Migrated an outdated Headless CMS from Backbone.js to React.js + Redux.js + Bootstrap, with a new design. This change helped the platform be more modern, fast, responsive, along with better structured code and modularized components which made work easier and more efficient',
            'Gained an understanding of how online stores work and what it takes to implement one by virtue of developing various online stores using Next.js and SSR',
            'Communicated effectively with the team and clients in order to achieve the best results',
        ],
    },
];

export default function Experience() {
    return (
        <section
            id="experience"
            className="mx-auto flex h-screen max-w-7xl flex-col"
        >
            <Text as="h1" size="text-5xl" weight="font-bold" className="mb-12">
                Experience
            </Text>
            <ul className="mx-auto">
                {experiences.map((exp, index) => (
                    <li key={index} className="pl-4">
                        <Text
                            as="h3"
                            size="text-xl"
                            weight="font-semibold"
                            className="flex flex-row items-center"
                        >
                            <Katana className="mr-4" />
                            {exp.role}
                        </Text>
                        <Text as="p" className="text-muted-light">
                            {exp.duration}
                        </Text>
                        {exp.list.length > 0 && (
                            <ul className="ml-4 list-disc">
                                {exp.list.map((item, index) => (
                                    <Text as="li" key={index}>
                                        {item}
                                    </Text>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
