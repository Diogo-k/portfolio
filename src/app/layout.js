import { Suspense } from 'react';
import { Sora, Noto_Serif_JP } from 'next/font/google';
import '@/styles/globals.css';

import ThemeProvider from '../utils/ThemeProvider';

import { Header, Footer } from '@/components';

const sora = Sora({
    subsets: ['latin'],
    variable: '--font-sora',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
    display: 'swap',
});

const notoSerifJP = Noto_Serif_JP({
    subsets: ['latin'],
    variable: '--font-noto-serif-jp',
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    display: 'swap',
});

export const metadata = {
    title: 'Diogo Paulo | Frontend Developer',
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
    authors: [{ name: 'Diogo Paulo' }],
    creator: 'Diogo Paulo',
    publisher: 'Diogo Paulo',
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
    //     title: 'Diogo Paulo | Frontend Developer',
    //     description:
    //         'Personal portfolio showcasing my work, skills, and experience in software development.',
    //     siteName: 'Diogo Paulo | Frontend Developer',
    //     images: [
    //         {
    //             url: '/og-image.jpg',
    //             width: 1200,
    //             height: 630,
    //             alt: 'Diogo Paulo | Frontend Developer',
    //         },
    //     ],
    // },
    // twitter: {
    //     card: 'summary_large_image',
    //     title: 'Diogo Paulo | Frontend Developer',
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
            className={`${sora.variable} ${notoSerifJP.variable} scroll-smooth`}
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
