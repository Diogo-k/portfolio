import * as motion from 'motion/react-client';

import { Button, Link, Text } from '@/components';

export default function NotFound() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const numberVariants = {
        tap: {
            scale: 1.1,
            rotate: [0, -10, 10, -10, 0],
            transition: { duration: 0.5 },
        },
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="mb-4 max-w-2xl text-center"
            >
                <motion.div variants={itemVariants} className="relative">
                    <motion.div
                        variants={numberVariants}
                        animate={'tap'}
                        whileTap="tap"
                        className="cursor-pointer"
                    >
                        <h1 className="bg-gradient-to-r from-primary-light to-accent-light bg-clip-text text-9xl font-bold text-transparent dark:from-primary-dark dark:to-accent-dark">
                            404
                        </h1>
                    </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Text
                        as="h2"
                        size="text-2xl"
                        weight="font-semibold"
                        className="mb-6 text-text-light dark:text-text-dark"
                    >
                        Looks like you&apos;ve ventured into the void
                    </Text>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Text
                        as="h3"
                        size="text-lg"
                        className="mt-6 text-muted-light dark:text-muted-dark"
                    >
                        This page could not be found. It either doesn&apos;t
                        exist or was deleted.
                        <br />
                        Or perhaps you don&apos;t exist and this webpage
                        couldn&apos;t find you.
                    </Text>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    className="mt-8 flex flex-col justify-center gap-4 sm:flex-row"
                >
                    <Button
                        as="link"
                        href="/"
                        variant="primary"
                        size="lg"
                        className="group"
                    >
                        Take Me Home
                        <span className="ml-2 transition-transform group-hover:rotate-12">
                            🏠
                        </span>
                    </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-12">
                    <Text
                        as="p"
                        size="text-sm"
                        className="text-muted-light dark:text-muted-dark"
                    >
                        Need help? <Link href="/#contact">Contact us</Link>
                    </Text>
                </motion.div>
            </motion.div>
        </div>
    );
}
