import PropTypes from 'prop-types';
import Image from 'next/image';

import { motion } from 'framer-motion';

/**
 * ProfileImage component with error handling and loading state
 *
 * @param {Object} props - Component props
 * @param {string} props.image - Image source
 * @returns {JSX.Element} The ProfileImage component
 */
const ProfileImage = ({ image }) => {
    return (
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary-light/20 sm:h-[350px] md:h-[400px] dark:hover:shadow-primary-dark/20">
            <motion.div
                className="relative size-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <Image
                    alt="Diogo Paulo - Frontend Developer"
                    src={image}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={50}
                    // placeholder="blur"
                    // loading="lazy"
                />
            </motion.div>
        </div>
    );
};

ProfileImage.propTypes = {
    image: PropTypes.string.isRequired,
};

export default ProfileImage;
