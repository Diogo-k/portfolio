import * as motion from 'motion/react-client';

import { CherryBlossom } from '@/assets';

const Loading = () => {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
                className="size-20"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: 'linear',
                }}
            >
                <motion.div
                    className="size-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: 'easeInOut',
                    }}
                >
                    <CherryBlossom className="fill-primary-light/80 dark:fill-primary-dark/80" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Loading;
