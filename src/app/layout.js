import { Suspense } from 'react';
import { Sora } from 'next/font/google';
import '@/styles/globals.css';

import { Header, Footer } from '@/components';
import ThemeProvider from '@/utils/ThemeProvider';

const sora = Sora({
    subsets: ['latin'],
    variable: '--font-sora',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
    display: 'swap',
});

export const metadata = {
    title: 'João Diogo Paulo | Frontend Developer',
    description:
        'Personal portfolio showcasing my work, skills, and experience in software development.',
    keywords: [
        'portfolio',
        'software developer',
        'web development',
        'frontend',
        'backend',
        'full stack',
    ],
    authors: [{ name: 'João Diogo Paulo' }],
    creator: 'João Diogo Paulo',
    publisher: 'João Diogo Paulo',
    // formatDetection: {
    //     email: false,
    //     address: false,
    //     telephone: false,
    // },
    // metadataBase: new URL('https://diogo-paulo.dev'),
    // openGraph: {
    //     type: 'website',
    //     locale: 'en_US',
    //     url: 'https://diogo-paulo.dev',
    //     title: 'João Diogo Paulo | Frontend Developer',
    //     description:
    //         'Personal portfolio showcasing my work, skills, and experience in software development.',
    //     siteName: 'João Diogo Paulo | Frontend Developer',
    //     images: [
    //         {
    //             url: '/og-image.jpg',
    //             width: 1200,
    //             height: 630,
    //             alt: 'João Diogo Paulo | Frontend Developer',
    //         },
    //     ],
    // },
    // twitter: {
    //     card: 'summary_large_image',
    //     title: 'João Diogo Paulo | Frontend Developer',
    //     description:
    //         'Personal portfolio showcasing my work, skills, and experience in software development.',
    //     images: ['/og-image.jpg'],
    //     creator: '@diogop',
    // },
    // robots: {
    //     index: true,
    //     follow: true,
    //     googleBot: {
    //         index: true,
    //         follow: true,
    //         'max-video-preview': -1,
    //         'max-image-preview': 'large',
    //         'max-snippet': -1,
    //     },
    // },
    // verification: {
    //     google: 'your-google-site-verification',
    // },
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${sora.variable} scroll-smooth`}
            suppressHydrationWarning
        >
            <body className="bg-background-light dark:bg-background-dark">
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
            </body>
        </html>
    );
}
