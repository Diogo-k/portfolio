import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import js from '@eslint/js';
import storybook from 'eslint-plugin-storybook';
import tailwind from 'eslint-plugin-tailwindcss';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import babelParser from '@babel/eslint-parser'; // <--- IMPORT PARSER

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next'),
    ...compat.extends('next/core-web-vitals'),

    js.configs.recommended,
    ...storybook.configs['flat/recommended'],
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
        ignores: ['.next', 'node_modules', '!.storybook'],
        rules: {
            'tailwindcss/no-custom-classname': 'off',
        },
        settings: {
            'import/resolver': {
                alias: {
                    map: [
                        ['@/context', './src/context/index'],
                        ['@/sections', './src/sections/index'],
                        ['@/components', './src/components/index'],
                        ['@/utils', './src/utils/index'],
                        ['@/assets', './src/assets/index'],
                        ['@/styles', './src/styles'],
                    ],
                    extensions: ['.js', '.jsx'],
                },
            },
        },
    },
];

export default eslintConfig;
