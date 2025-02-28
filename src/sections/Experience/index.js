'use client';

import { Text } from '@/components';

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
    {
        role: 'Collaborator @ NOS Lusomundo Audiovisuais',
        duration: '2017 - 2019',
        list: [],
    },
];

export default function Experience() {
    return (
        <section
            id="experience"
            className="mx-auto flex h-screen max-w-7xl flex-col items-center justify-center"
        >
            <Text as="h1" size="4xl" weight="bold" align="center">
                Experience
            </Text>
            <hr />
            <ul className="mx-auto">
                {experiences.map((exp, index) => (
                    <li key={index} className="pl-4">
                        <Text
                            as="h3"
                            size="xl"
                            weight="semibold"
                            className="flex flex-row items-center"
                        >
                            <svg
                                width="64px"
                                height="64px"
                                viewBox="-51.2 -51.2 614.40 614.40"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#000000"
                                transform="matrix(1, 0, 0, 1, 0, 0)rotate(45)"
                                stroke="#000000"
                                strokeWidth="2.56"
                                className="mr-4"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    stroke="#0000000"
                                    strokeWidth="4.096"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        fill="#C73737"
                                        d="M482.403 42.826c-10.537-8.76-24.84-4.167-43.264 11.643-76.1 65.307-202.78 179.14-282.432 269.103l21.07 21.07c82.21-87.285 203.37-205.524 304.625-301.817zm-338.477 293.42l-17.17 17.028 22.302 22.303c5.313-5.817 10.787-11.75 16.41-17.79zm-56.796.03l-12.728 12.728 79.196 79.196 12.728-12.728zm2.942 54.185l-60.475 60.475c.372 11.49 10.708 22.336 22.628 22.627l60.474-60.474-8.137-8.136c2.657 4.264 2.84 8.705.457 11.097-3.124 3.123-9.554 1.758-14.363-3.05 4.808 4.808 6.174 11.24 3.05 14.363-3.125 3.124-9.555 1.76-14.364-3.05 4.81 4.81 6.174 11.24 3.05 14.363-3.124 3.125-9.555 1.76-14.363-3.05 4.808 4.81 6.173 11.24 3.05 14.364-3.125 3.124-9.556 1.76-14.364-3.05 4.808 4.81 6.174 11.24 3.05 14.364-3.125 3.124-9.555 1.76-14.364-3.05-4.808-4.808-6.173-11.24-3.05-14.363 3.125-3.123 9.556-1.758 14.364 3.05-4.808-4.808-6.173-11.238-3.05-14.362 3.125-3.125 9.555-1.76 14.364 3.05-4.81-4.81-6.174-11.24-3.05-14.364 3.125-3.124 9.555-1.76 14.363 3.05-4.808-4.81-6.173-11.24-3.05-14.364 3.125-3.124 9.556-1.76 14.364 3.05-4.808-4.81-6.173-11.24-3.05-14.364 2.39-2.383 6.828-2.202 11.09.45z"
                                    ></path>
                                </g>
                            </svg>
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
