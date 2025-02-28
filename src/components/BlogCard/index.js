export default function BlogCard() {
    return (
        <div className="max-w-md overflow-hidden rounded-2xl border border-border-light bg-surface-light shadow-lg transition duration-300 dark:border-border-dark dark:bg-surface-dark">
            {/* Image Placeholder */}
            <div className="flex h-48 items-center justify-center bg-primary-light dark:bg-primary-dark">
                <span className="text-xl font-bold text-white">Blog Image</span>
            </div>

            <div className="p-6">
                {/* Title */}
                <h2 className="text-2xl font-bold text-primary-light dark:text-text-dark">
                    The Future of Cyberpunk Design
                </h2>

                {/* Description */}
                <p className="mt-2 text-muted-light dark:text-muted-dark">
                    Exploring the blend of traditional Japanese aesthetics with
                    modern cyberpunk design. A journey through color, culture,
                    and technology.
                </p>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-lg bg-tertiary-light px-3 py-1 text-xs font-semibold text-white dark:bg-tertiary-dark">
                        Cyberpunk
                    </span>
                    <span className="rounded-lg bg-secondary-light px-3 py-1 text-xs font-semibold text-white dark:bg-secondary-dark">
                        Japan
                    </span>
                    <span className="rounded-lg bg-accent-light px-3 py-1 text-xs font-semibold text-white dark:bg-accent-dark">
                        Tech
                    </span>
                </div>
            </div>

            {/* Read More Button */}
            <div className="flex justify-end px-6 py-4">
                <button className="rounded-lg bg-primary-light px-4 py-2 text-white transition duration-300 dark:bg-primary-dark dark:hover:bg-accent-dark">
                    Read More
                </button>
            </div>
        </div>
    );
}
