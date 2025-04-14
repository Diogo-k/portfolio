export const ANIMATION_VARIANTS = {
    container: {
        initial: { opacity: 0 },
        whileInView: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    },
};
