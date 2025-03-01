/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#9E1A1A',
                    dark: '#B42A2A',
                },
                accent: {
                    light: '#B42A2A',
                    dark: '#9E1A1A',
                },
                background: {
                    light: '#ECE5DA',
                    dark: '#1B1B1D',
                },
                surface: {
                    light: '#E0D8CC',
                    dark: '#232325',
                },
                text: {
                    light: '#1A1A1A',
                    dark: '#D9D9D9',
                },
                muted: {
                    light: '#575757',
                    dark: '#737373',
                },
                border: {
                    light: '#C4B8A8',
                    dark: '#292929',
                },
            },
            fontFamily: {
                sora: ['var(--font-sora)', 'sans-serif'], // Main font
                japanese: ['var(--font-noto-serif-jp)', 'serif'], // Japanese font
            },
        },
    },
};

export default config;
