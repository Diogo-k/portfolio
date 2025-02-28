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
                    light: '#B22222', // Firebrick Red
                    dark: '#9B1C1C', // Deep Maroon Red
                },
                secondary: {
                    light: '#8B0000', // Dark Red
                    dark: '#6D1414', // A richer, muted deep red
                },
                accent: {
                    light: '#C73737', // Crimson Red
                    dark: '#AA1E1F', // Dark Accent Red
                },
                tertiary: {
                    light: '#5E2B5C', // Deep Purple
                    dark: '#1E3A8A', // Cool Neon Blue
                },
                background: {
                    light: '#F8F5F0', // Warm White
                    dark: '#0F0F10', // Cyberpunk Black with Blue Tint
                },
                surface: {
                    light: '#ECE5DA', // Paper Beige
                    dark: '#1B1B1D', // Off Black with a hint of warmth
                },
                text: {
                    light: '#1A1A1A', // Almost Black
                    dark: '#D9D9D9', // Softer White
                },
                muted: {
                    light: '#575757', // Muted Grey
                    dark: '#737373', // Soft Grey
                },
                border: {
                    light: '#C4B8A8', // Stone Grey
                    dark: '#292929', // Subtle Soft Grey
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
