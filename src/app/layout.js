import { Suspense } from 'react';
import PropTypes from 'prop-types';
import { MotionConfig } from 'motion/react';
import { Sora } from 'next/font/google';
import '@/styles/globals.css';
import { Header, Footer } from '@/components';
import ThemeProvider from '@/utils/ThemeProvider';
import { baseMeta } from '@/utils/meta';

const sora = Sora({
    subsets: ['latin'],
    variable: '--font-sora',
    weight: ['400', '500', '600', '700'],
    display: 'swap',
});

export const metadata = {
    ...baseMeta({
        title: 'Frontend Developer',
        description:
            'Personal portfolio showcasing my work, skills, and experience in software development.',
    }),
};

/**
 * Root layout component
 *
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The content of the component
 */
export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${sora.variable} scroll-smooth`}
            suppressHydrationWarning
        >
            <body className="bg-background-light dark:bg-background-dark">
                <MotionConfig reducedMotion="user">
                    <ThemeProvider
                        attribute="data-mode"
                        defaultTheme="system"
                        enableSystem
                    >
                        <Suspense>
                            <Header />
                        </Suspense>
                        <main>{children}</main>
                        <Footer />
                    </ThemeProvider>
                </MotionConfig>
            </body>
        </html>
    );
}

RootLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
