export const ANIMATION_VARIANTS = {
    letter: {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    },
    word: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    reveal: {
        hidden: { width: 0, x: 0 },
        visible: { width: '100%', x: 0 },
        exit: { width: '100%', x: '100%' },
    },
    container: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    button: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    },
};

export const ANIMATION_TIMINGS = {
    containerDelay: 1.25,
    letterDelay: 0.05,
    wordDelay: 0.2,
    revealDelay: 0.4,
};
