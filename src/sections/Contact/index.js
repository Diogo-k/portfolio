import { Text } from '@/components';

export default function Contact() {
    return (
        <section
            id="contact"
            className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16"
        >
            <Text as="h1" size="4xl" weight="bold" align="center">
                Contact
            </Text>

            <form
                className="mt-8 w-full max-w-2xl space-y-6 rounded-lg bg-surface-light p-8 dark:bg-surface-dark"
                action="#"
                method="POST"
            >
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-muted-light dark:text-muted-dark"
                    >
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        required
                        className="mt-2 w-full rounded-md border border-border-light bg-background-light px-4 py-2 text-base text-text-light focus:outline-none focus:ring-2 focus:ring-primary-light dark:border-border-dark dark:bg-background-dark dark:text-text-dark dark:focus:ring-primary-dark"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-muted-light dark:text-muted-dark"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        className="mt-2 w-full rounded-md border border-border-light bg-background-light px-4 py-2 text-base text-text-light focus:outline-none focus:ring-2 focus:ring-primary-light dark:border-border-dark dark:bg-background-dark dark:text-text-dark dark:focus:ring-primary-dark"
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
                        placeholder="Write your message here"
                        required
                        className="mt-2 w-full rounded-md border border-border-light bg-background-light px-4 py-2 text-base text-text-light focus:outline-none focus:ring-2 focus:ring-primary-light dark:border-border-dark dark:bg-background-dark dark:text-text-dark dark:focus:ring-primary-dark"
                    ></textarea>
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-full rounded-md bg-primary-light py-3 text-lg font-semibold text-white shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-primary-dark dark:hover:bg-primary-light dark:focus:ring-primary-dark"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </section>
    );
}
