import { Link, Text } from '@/components';
import { LinkedIn, Github, Mail } from '@/assets';
export default function Contact() {
    return (
        <section
            id="contact"
            className="mx-auto flex min-h-[50vh] max-w-5xl flex-col py-28"
        >
            <Text
                as="h1"
                size="text-4xl"
                weight="font-bold"
                align="center"
                id="contact-heading"
                role="heading"
                aria-label="Contact section"
            >
                Contact
            </Text>

            <div className="mt-8 flex w-full max-w-6xl flex-col gap-8 md:flex-row">
                <div className="flex-1">
                    <div className="space-y-4">
                        <div className="rounded-lg border border-border-light bg-surface-light p-6 dark:border-border-dark dark:bg-surface-dark">
                            <div className="flex flex-col items-center text-center">
                                <Mail className="fill-primary-light" />
                                <Text
                                    as="h3"
                                    size="text-base"
                                    weight="font-semibold"
                                    id="email-heading"
                                    role="heading"
                                    aria-label="Email contact information"
                                >
                                    Email
                                </Text>
                                <Text
                                    size="text-sm"
                                    className="text-muted-light dark:text-muted-dark"
                                    id="email-address"
                                    role="text"
                                    aria-label="Email address"
                                >
                                    jdiogok@gmail.com
                                </Text>
                                <Link
                                    href="mailto:jdiogok@gmail.com"
                                    isExternal
                                    ariaLabel="Send email to jdiogok@gmail.com"
                                    ariaCurrent="contact"
                                    className="mt-2 text-sm"
                                >
                                    Write me →
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-lg border border-border-light bg-surface-light p-6 dark:border-border-dark dark:bg-surface-dark">
                            <div className="flex flex-col items-center text-center">
                                <LinkedIn className="fill-primary-light" />
                                <Text
                                    as="h3"
                                    size="text-base"
                                    weight="font-semibold"
                                    id="linkedin-heading"
                                    role="heading"
                                    aria-label="LinkedIn contact information"
                                >
                                    Linked In
                                </Text>
                                <Link
                                    href="https://www.linkedin.com"
                                    isExternal
                                    ariaLabel="Visit LinkedIn profile"
                                    ariaCurrent="contact"
                                    className="mt-2 text-sm"
                                >
                                    Write me →
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-lg border border-border-light bg-surface-light p-6 dark:border-border-dark dark:bg-surface-dark">
                            <div className="flex flex-col items-center text-center">
                                <Github className="fill-primary-light" />
                                <Text
                                    as="h3"
                                    size="text-base"
                                    weight="font-semibold"
                                    id="github-heading"
                                    role="heading"
                                    aria-label="GitHub contact information"
                                >
                                    Github
                                </Text>
                                <Text
                                    size="text-sm"
                                    className="text-muted-light dark:text-muted-dark"
                                    id="github-username"
                                    role="text"
                                    aria-label="GitHub username"
                                >
                                    Diogo-k
                                </Text>
                                <Link
                                    href="https://github.com/Diogo-k"
                                    isExternal
                                    ariaLabel="Visit GitHub profile"
                                    ariaCurrent="contact"
                                    className="mt-2 text-sm"
                                >
                                    Write me →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-semibold text-muted-light dark:text-muted-dark"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                required
                                className="mt-2 w-full rounded-md border border-border-light bg-surface-light px-4 py-2 text-base text-text-light focus:outline-none focus:ring-2 focus:ring-primary-light dark:border-border-dark dark:bg-surface-dark dark:text-text-dark dark:focus:ring-primary-dark"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-semibold text-muted-light dark:text-muted-dark"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                className="mt-2 w-full rounded-md border border-border-light bg-surface-light px-4 py-2 text-base text-text-light focus:outline-none focus:ring-2 focus:ring-primary-light dark:border-border-dark dark:bg-surface-dark dark:text-text-dark dark:focus:ring-primary-dark"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-semibold text-muted-light dark:text-muted-dark"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                placeholder="Write your message here..."
                                required
                                className="mt-2 w-full rounded-md border border-border-light bg-surface-light px-4 py-2 text-base text-text-light focus:outline-none focus:ring-2 focus:ring-primary-light dark:border-border-dark dark:bg-surface-dark dark:text-text-dark dark:focus:ring-primary-dark"
                            ></textarea>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary-light py-3 text-lg font-semibold text-white shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-primary-dark dark:hover:bg-primary-light dark:focus:ring-primary-dark"
                            >
                                Send message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
