import { Sora } from 'next/font/google';

import { withThemeByClassName } from '@storybook/addon-themes';

import '../src/styles/globals.css';

const sora = Sora({
    subsets: ['latin'],
    variable: '--font-sora',
    weight: ['400', '600', '700'],
    display: 'swap',
});

/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        layout: 'fullscreen',
    },
};

export const decorators = [
    (Story) => (
        <main className={`${sora.variable}`}>
            <Story />
        </main>
    ),
    withThemeByClassName({
        themes: {
            light: 'light',
            dark: 'dark',
        },
        defaultTheme: 'light',
    }),
];

export default preview;
