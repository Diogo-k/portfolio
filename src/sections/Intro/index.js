// import { Canvas } from '@react-three/fiber';
// import { CherryBlossoms } from '@/components';

'use client';

import { motion } from 'framer-motion';

import { DecryptedText, Text, Button } from '@/components';

export default function Intro() {
    const MotionText = motion.create(Text);

    return (
        <section
            id="home"
            className="flex h-screen flex-col items-center justify-center"
        >
            {/* <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                className="absolute block size-full"
            >
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 2, 2]} intensity={1} />
                <CherryBlossoms />
            </Canvas> */}
            <header className="mx-auto max-w-5xl space-y-8 pb-14 md:py-36">
                <DecryptedText
                    className="font-sora text-text-light dark:text-text-dark"
                    encryptedClassName="font-japanese text-text-light dark:text-text-dark"
                    text="Hi, I'm Diogo Paulo"
                    animateOn="view"
                    speed={100}
                    sequential
                />
                <div className="flex flex-row items-center gap-8">
                    <motion.div
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1, originX: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="size-full bg-primary-dark p-4"
                    >
                        <MotionText
                            initial={{ opacity: 0, x: -25 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.6,
                                ease: 'easeOut',
                            }}
                            as="h1"
                            weight="bold"
                            size="9xl"
                            className="text-white"
                        >
                            Frontend Developer
                        </MotionText>
                    </motion.div>
                    <Text as="p" size="xl">
                        Transforming ideas into interactive and seamless digital
                        experiences with cutting-edge frontend development.
                    </Text>
                </div>
                <div className="flex justify-start gap-2 pt-3 md:pt-6">
                    <Button as="a" href="https://github.com/Diogo-k" size="lg">
                        Github
                    </Button>
                    <Button as="a" href="https://github.com/Diogo-k" size="lg">
                        Linked In
                    </Button>
                    <Button as="a" href="https://github.com/Diogo-k" size="lg">
                        Test
                    </Button>
                </div>
            </header>
        </section>
    );
}
