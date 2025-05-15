import { Link } from '@/components';

/**
 * Footer component that displays a copyright message and a link to the humans.txt file.
 *
 * @returns {React.ReactNode} The Footer component
 */
const Footer = () => {
    return (
        <footer className="bg-background border-t-2 border-border-light py-8 dark:border-t-4 dark:border-border-dark">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center space-y-8">
                    <p className="text-s text-center">
                        <Link
                            href="/humans.txt"
                            isExternal
                            aria-label="View humans.txt in new tab"
                            className="mt-2 text-sm text-primary-light hover:text-primary-light/80 dark:text-text-dark dark:hover:text-text-dark/80"
                        >
                            {`© ${new Date().getFullYear()} João Diogo Paulo`}
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
