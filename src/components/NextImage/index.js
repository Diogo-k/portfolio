import Image from 'next/image';

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

export default NextImage;
