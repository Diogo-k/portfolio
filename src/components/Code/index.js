'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark-dimmed.min.css';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);

/**
 * A code component that highlights code and allows copying
 *
 * @param {React.ReactNode} children - The code to highlight
 * @param {string} language - The language of the code
 * @returns {React.ReactNode} The rendered component
 */
const Code = ({ children, language = '' }) => {
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (typeof children === 'string') {
            navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 1250);
        }
    };

    const displayLanguage = language?.replace(/^language-/, '') || '';

    return (
        <div className="my-6 overflow-hidden rounded-lg shadow-md">
            {displayLanguage && (
                <div className="bg-primary-light px-4 py-1.5 text-xs text-white dark:bg-primary-dark dark:text-white">
                    {displayLanguage}
                </div>
            )}
            <div className="relative">
                <pre className="overflow-x-auto">
                    <code className={language}>{children}</code>
                </pre>
                <button
                    onClick={handleCopy}
                    className="absolute bottom-2 right-2 z-10 rounded bg-primary-light px-2 py-1 text-xs font-medium text-white hover:bg-primary-dark dark:bg-primary-dark dark:text-white dark:hover:bg-primary-light"
                    aria-label="Copy code"
                    disabled={typeof children !== 'string'}
                >
                    {copied ? 'Copied!' : 'Copy'}
                    <span className="sr-only">Button to copy code</span>
                </button>
            </div>
        </div>
    );
};

Code.propTypes = {
    children: PropTypes.node.isRequired,
    language: PropTypes.string,
};

export default Code;
