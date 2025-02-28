import { Sora, Noto_Serif_JP } from 'next/font/google';

import { withThemeByClassName } from '@storybook/addon-themes';

import '../src/styles/globals.css';

const sora = Sora({
    subsets: ['latin'],
    variable: '--font-sora',
    weight: ['400', '600', '700'],
    display: 'swap',
});

const notoSerifJP = Noto_Serif_JP({
    subsets: ['latin'],
    variable: '--font-noto-serif-jp',
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
        <main className={`${sora.variable} ${notoSerifJP.variable}`}>
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
