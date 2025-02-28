// import { Canvas } from '@react-three/fiber';
// import { CherryBlossoms } from '@/components';

import { DecryptedText, Text, Button } from '@/components';

export default function Intro() {
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
                    text="Hi, I'm Diogo Paulo"
                    animateOn="view"
                    speed={100}
                    sequential
                />
                <div className="flex flex-row items-center gap-8">
                    <Text as="h1" weight="bold" size="8xl">
                        Frontend Developer
                    </Text>
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
