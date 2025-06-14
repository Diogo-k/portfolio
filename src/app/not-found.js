import { Text, Button, Link } from '@/components';

/**
 * NotFound Page
 *
 * @returns {React.ReactNode} The rendered component
 */
export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark">
            <div className="mb-4 max-w-2xl text-center">
                <div className="relative">
                    <h1 className="bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-9xl font-bold text-transparent dark:from-primary-dark dark:to-accent-dark">
                        404
                    </h1>
                </div>

                <Text
                    as="h2"
                    size="text-2xl"
                    weight="font-semibold"
                    align="center"
                    className="mb-6"
                >
                    Looks like you&apos;ve ventured into the void
                </Text>

                <Text as="h3" size="text-lg" align="center" className="mt-6">
                    This page could not be found. It either doesn&apos;t exist
                    or was deleted.
                    <br />
                    Or perhaps you don&apos;t exist and this webpage
                    couldn&apos;t find you.
                </Text>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Button
                        as="link"
                        href="/"
                        variant="primary"
                        size="lg"
                        className="w-fit"
                    >
                        Take Me Home
                    </Button>
                </div>

                <div className="mt-12">
                    <Text as="p" size="text-sm" align="center">
                        Need help? <Link href="/#contact">Contact me</Link>
                    </Text>
                </div>
            </div>
        </div>
    );
}
