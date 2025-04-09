import Image from 'next/image';
import PropTypes from 'prop-types';

/**
 * A wrapper component for Next.js Image component with additional features like blur placeholder support.
 * Provides a consistent interface for displaying images across the application.
 *
 * @param {Object} props - Component props
 * @param {string} props.src - The source URL of the image
 * @param {number} props.width - The width of the image
 * @param {number} props.height - The height of the image
 * @param {string} [props.alt='Default Alt Image'] - Alt text for the image
 * @param {string|boolean} [props.blurDataURL=false] - Blur data URL for the image placeholder
 * @returns {JSX.Element} A Next.js Image component with enhanced features
 */
const NextImage = (
    { src, width, height, alt = 'Default Alt Image', blurDataURL = false },
    ...props
) => {
    return (
        <Image
            src={src}
            width={width}
            height={height}
            alt={alt}
            {...(blurDataURL && { placeholder: 'blur' })}
            {...(blurDataURL && { blurDataURL: blurDataURL })}
            {...props}
        />
    );
};

NextImage.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    alt: PropTypes.string,
    blurDataURL: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default NextImage;
