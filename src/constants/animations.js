//* This was a way to have consistent animations across the app
//* I'm not sure if it's still needed, but I'm keeping it for now

export const bezierFastoutSlowin = [0.4, 0.0, 0.2, 1];

export const SLIDE_UP = {
    hidden: { y: '110%' },
    visible: { y: '0%' },
    transition: { ease: bezierFastoutSlowin, duration: 0.6 },
};

export const FADE_IN = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
    },
    transition: { ease: bezierFastoutSlowin, duration: 0.4 },
};

export const FADE_IN_SLIDE_UP = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
    transition: {
        ease: bezierFastoutSlowin,
        duration: 0.8,
    },
};

export const FADE_IN_SLIDE_DOWN = {
    hidden: { opacity: 0, y: -24 },
    visible: { opacity: 1, y: 0 },
    transition: {
        ease: bezierFastoutSlowin,
        duration: 0.6,
    },
};
