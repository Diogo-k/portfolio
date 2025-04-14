export const ANIMATION_VARIANTS = {
    heading: {
        initial: { opacity: 0, y: -20 },
        whileInView: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    },
    column: {
        initial: { opacity: 0, y: -10 },
        whileInView: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.2,
            },
        },
    },
    paragraphs: {
        initial: { opacity: 0, y: -10 },
        whileInView: {
            opacity: 1,
            y: 0,
        },
    },
};
