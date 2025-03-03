'use client';

import { motion } from 'framer-motion';

import { CherryBlossoms, DecryptedText, Text, Button } from '@/components';

export default function Intro() {
    const MotionDecryptedText = motion.create(DecryptedText);
    const MotionText = motion.create(Text);

    return (
        <section
            id="home"
            className="flex h-screen flex-col items-center justify-center"
        >
            <CherryBlossoms />
            <div className="z-10 mx-auto max-w-5xl pb-14 md:py-36">
                <MotionDecryptedText
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.25,
                        delay: 1.7,
                        ease: 'easeOut',
                    }}
                    className="font-sora text-text-light dark:text-text-dark"
                    encryptedClassName="font-japanese text-text-light dark:text-text-dark"
                    text="Hi, I'm Diogo Paulo"
                    animateOn="view"
                    speed={100}
                    sequential
                />
                <div className="flex flex-row items-center gap-8">
                    <MotionText
                        initial={{ opacity: 0, x: -25 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.25,
                            delay: 2,
                            ease: 'easeOut',
                        }}
                        as="span"
                        weight="bold"
                        size="9xl"
                        className="text-9xl"
                    >
                        Frontend Developer
                    </MotionText>
                    {/* <Text as="p" size="xl">
                        Transforming ideas into interactive and seamless digital
                        experiences with cutting-edge frontend development.
                    </Text> */}
                </div>
                <div className="flex justify-start gap-2 pt-3 md:pt-6">
                    <Button
                        as="a"
                        href="https://github.com/Diogo-k"
                        size="lg"
                        variant="outline"
                    >
                        Github
                    </Button>
                    <Button
                        as="a"
                        href="https://github.com/Diogo-k"
                        size="lg"
                        variant="outline"
                    >
                        Linked In
                    </Button>
                    <Button
                        as="a"
                        href="https://github.com/Diogo-k"
                        size="lg"
                        variant="outline"
                    >
                        Test
                    </Button>
                </div>
            </div>
        </section>
    );
}
