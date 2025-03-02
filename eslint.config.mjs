import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import js from '@eslint/js';
import storybook from 'eslint-plugin-storybook';
import tailwind from 'eslint-plugin-tailwindcss';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

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
        files: [
            'src/**/*.js',
            'src/**/*.jsx',
            '**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)',
        ],
        ignores: ['.next', 'node_modules', '!.storybook'],
        rules: {
            //! eslint-plugin-import
            'import/no-unresolved': 'error',
            'import/named': 'error',
            'import/namespace': 'error',
            'import/default': 'error',
            'import/export': 'error',
            'import/no-named-as-default': 'warn',
            'import/no-named-as-default-member': 'warn',
            'import/no-duplicates': 'warn',
            'tailwindcss/no-custom-classname': 'off',
        },
        settings: {
            'prettier/prettier': [
                'error',
                {
                    printWidth: 80,
                    tabWidth: 4,
                    useTabs: false,
                    semi: true,
                    singleQuote: true,
                    trailingComma: 'es5',
                    bracketSpacing: true,
                    arrowParens: 'always',
                    endOfLine: 'lf',
                    plugins: ['prettier-plugin-tailwindcss'],
                },
            ],
            'import/resolver': {
                alias: {
                    map: [
                        ['@/components', './src/components/index'],
                        ['@/styles', './src/styles'],
                        ['@/assets', './src/assets/index'],
                    ],
                    extensions: ['.js', '.jsx'],
                },
            },
        },
    },
];

export default eslintConfig;
