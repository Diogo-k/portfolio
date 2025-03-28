'use client';

import { motion } from 'framer-motion';

import { CherryBlossoms, DecryptedText, Text, Button } from '@/components';

import { RightArrow } from '@/assets';

export default function Intro() {
    return (
        <section
            id="home"
            className="flex h-screen flex-col items-center justify-center"
        >
            <CherryBlossoms />
            <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 1.4 }}
                className="z-10 mx-auto max-w-5xl pb-14 md:py-36"
            >
                <DecryptedText
                    className="font-sora text-text-light dark:text-text-dark"
                    encryptedClassName="font-japanese text-text-light dark:text-text-dark"
                    text="Hi, I'm Diogo Paulo"
                    animateOn="view"
                    speed={100}
                    sequential
                />
                <Text as="p" weight="font-bold" size="text-4xl md:text-9xl">
                    Frontend Developer
                </Text>
                <div className="pt-3 md:pt-6">
                    <Button
                        variant="primary"
                        size="md"
                        as="link"
                        href="#contact"
                        aria-label="Contact me"
                    >
                        Contact me
                        <RightArrow className="ml-1 size-4" />
                    </Button>
                </div>
            </motion.div>
        </section>
    );
}
