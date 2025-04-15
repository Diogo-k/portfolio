'use client';

import { useRef } from 'react';
import PropTypes from 'prop-types';

import { motion, useInView } from 'motion/react';

import { Katana } from '@/assets';

/**
 * SectionDivider component that displays a decorative katana slash animation
 * @param {Object} props - The component props
 * @param {string} props.className - The class name for the component
 * @param {string} props.ariaLabel - The aria label for the component
 */
const SectionDivider = ({
    className = '',
    ariaLabel = 'Decorative section divider',
}) => {
    const dividerRef = useRef(null);
    const isInView = useInView(dividerRef, { once: true, amount: 0.3 });

    // Variants for the katana slash animation
    const katanaVariants = {
        idle: { rotate: 0, y: 0 },
        slash: {
            rotate: [0, -55, 70, 0],
            y: [0, -5, 5, 0],
            transition: {
                duration: 0.5,
                times: [0, 0.2, 0.5, 1],
                ease: ['easeOut', 'easeIn', 'easeOut', 'easeOut'],
            },
        },
    };

    return (
        <motion.section
            ref={dividerRef}
            className={`w-full overflow-hidden ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            role="presentation"
            aria-hidden="true"
            aria-label={ariaLabel}
        >
            <div className="relative flex h-32 w-full items-center justify-center">
                <motion.div
                    className="absolute left-0 top-1/2 h-[2px] w-[38%] -translate-y-1/2 bg-gradient-to-r from-transparent to-primary-light dark:to-primary-light"
                    initial={{ width: 0 }}
                    animate={{ width: isInView ? '38%' : 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                />

                <motion.div
                    className="absolute right-0 top-1/2 h-[2px] w-[38%] -translate-y-1/2 bg-gradient-to-l from-transparent to-primary-light dark:to-primary-light"
                    initial={{ width: 0 }}
                    animate={{ width: isInView ? '38%' : 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                />

                <motion.div
                    className="relative z-10 flex size-20 items-center justify-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{
                        scale: isInView ? 1 : 0,
                        rotate: isInView ? 0 : -180,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.8,
                        type: 'spring',
                        stiffness: 200,
                    }}
                >
                    <div className="absolute size-full rounded-full bg-gradient-to-br from-primary-light/10 to-primary-light/5 backdrop-blur-sm" />

                    <motion.div
                        variants={katanaVariants}
                        initial="idle"
                        whileTap="slash"
                        className="cursor-pointer"
                    >
                        <Katana
                            className="fill-accent-light drop-shadow-lg dark:fill-accent-dark"
                            width={60}
                            height={60}
                            aria-hidden="true"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

SectionDivider.propTypes = {
    className: PropTypes.string,
    ariaLabel: PropTypes.string,
};

export default SectionDivider;
