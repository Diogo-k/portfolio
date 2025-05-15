import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tailwind from 'eslint-plugin-tailwindcss';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import babelParser from '@babel/eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next'),
    ...compat.extends('next/core-web-vitals'),

    js.configs.recommended,
    ...tailwind.configs['flat/recommended'],

    eslintPluginPrettierRecommended,

    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            parser: babelParser,
            parserOptions: {
                requireConfigFile: false,
                sourceType: 'module',
                ecmaVersion: 'latest',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
    {
        files: [
            'src/**/*.js',
            'src/**/*.jsx',
            '**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)',
        ],
        ignores: ['.next', 'node_modules'],
        rules: {
            'tailwindcss/no-custom-classname': 'off',
        },
        settings: {
            'import/resolver': {
                alias: {
                    map: [
                        ['@/sections', './src/sections/index'],
                        ['@/components', './src/components/index'],
                        ['@/utils/*', './src/utils/*'],
                        ['@/assets', './src/assets/index'],
                        ['@/styles/*', './src/styles/*'],
                        ['@/constants/*', './src/constants/*'],
                        ['@/config', './src/config.json'],
                    ],
                    extensions: ['.js', '.jsx'],
                },
            },
        },
    },
];

export default eslintConfig;
