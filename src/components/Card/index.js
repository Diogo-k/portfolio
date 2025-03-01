export default function Card({ title, description }) {
    return (
        <div className="rounded-lg border border-border-light bg-background-light p-6 shadow-lg transition-colors duration-300 dark:border-border-dark dark:bg-background-dark">
            {/* Title (No accent by default, only on hover) */}
            <h2 className="text-xl font-bold text-text-light transition-colors duration-300 hover:text-accent-light dark:text-text-dark dark:hover:text-accent-dark">
                {title}
            </h2>

            {/* Description */}
            <p className="mt-2 text-muted-light dark:text-muted-dark">
                {description}
            </p>

            {/* Button - Primary by default, Accent on hover */}
            <button className="mt-4 rounded bg-primary-light px-4 py-2 font-bold text-white transition-colors duration-300 hover:bg-accent-light dark:bg-primary-dark dark:hover:bg-accent-dark">
                Learn More
            </button>
        </div>
    );
}
