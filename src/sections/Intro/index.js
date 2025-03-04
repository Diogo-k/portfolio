import { Github, LinkedIn } from '@/assets';
import { CherryBlossoms, DecryptedText, Text, Button } from '@/components';

export default function Intro() {
    return (
        <section
            id="home"
            className="flex h-screen flex-col items-center justify-center"
        >
            <CherryBlossoms />
            <div className="z-10 mx-auto max-w-5xl pb-14 md:py-36">
                <DecryptedText
                    className="font-sora text-text-light dark:text-text-dark"
                    encryptedClassName="font-japanese text-text-light dark:text-text-dark"
                    text="Hi, I'm Diogo Paulo"
                    animateOn="view"
                    speed={100}
                    sequential
                />
                <Text as="p" weight="bold" size="9xl">
                    Frontend Developer
                </Text>
                <div className="flex justify-start gap-2 pt-3 md:pt-6">
                    <Button
                        as="a"
                        href="https://github.com/Diogo-k"
                        target="_blank"
                        size="lg"
                        variant="outline"
                    >
                        <Github className="fill-primary-light" />
                    </Button>
                    <Button
                        as="a"
                        href="https://www.linkedin.com/in/jdiogop/"
                        target="_blank"
                        size="lg"
                        variant="outline"
                    >
                        <LinkedIn className="fill-primary-light" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
