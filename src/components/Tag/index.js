import { motion } from 'framer-motion';

export default function Tag({ children }) {
    return (
        <motion.span
            className="rounded-2xl bg-primary-light px-3 py-1 text-xs font-semibold text-white dark:bg-primary-dark"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.span>
    );
}
