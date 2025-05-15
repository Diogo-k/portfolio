'use client';

import { useEffect } from 'react';
import { Text, Button, Link } from '@/components';

/**
 * Error Page
 *
 * @returns {React.ReactNode} The rendered component
 */
export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark">
            <div className="max-w-2xl text-center">
                <h1 className="mb-4 bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-9xl font-bold text-transparent dark:from-primary-dark dark:to-accent-dark">
                    500
                </h1>

                <Text
                    as="h2"
                    size="text-2xl"
                    weight="font-semibold"
                    align="center"
                    className="mb-6"
                >
                    Oops! Something went wrong on our end.
                </Text>

                <Text as="h3" size="text-lg" align="center" className="mt-6">
                    {`>`} {error.message}
                </Text>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        onClick={() => reset()}
                        variant="primary"
                        size="lg"
                        className="w-fit"
                    >
                        Try Again
                    </Button>
                </div>

                <div className="mt-12">
                    <Text as="p" size="text-sm" align="center">
                        Need help?{' '}
                        <Link
                            href="mailto:jdiogok@gmail.com"
                            isExternal
                            ariaLabel="Send email to jdiogok@gmail.com"
                        >
                            Contact me
                        </Link>
                    </Text>
                </div>
            </div>
        </div>
    );
}
