'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

/**
 * ProfileImage component with error handling and loading state
 *
 * @returns {React.ReactNode} The ProfileImage component
 */
const ProfileImage = () => {
    return (
        <div className="relative h-[300px] w-full overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary-light/20 md:h-[500px] dark:hover:shadow-primary-dark/20">
            <motion.div
                className="relative size-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
            >
                <Image
                    alt="Diogo Paulo - Frontend Developer"
                    src="/static/skydive.jpg"
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCABWAFYDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAIDBAEF/8QAGxABAQEBAQEBAQAAAAAAAAAAAAECAxETEmH/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EABsRAQEBAQEBAQEAAAAAAAAAAAABERICMQMh/9oADAMBAAIRAxEAPwD0S0/hbHS48TpKpSU9GEEdB6WOw8LDwaMNDQsNC1WOgAjx3wtOWo1WJ6Tqmk6NPkoco9HR8nh4nKeUdDk8NCSmlLRyYOegaMN6W0Wk1pGrxzVS1Ta0lrRWqkFo9Tuh+k9KxaU0qE0eaHQ5XlN6jNO/o9TivoT/AED0sNdE1pK7JraNVh9bR1su9o66FaqK3bn7Z70cnRnfS5GubPNsk6HmxKLGqbN+2Wbd+i5UVp/YZvoD0nb0Jrojdp76M+gpvoz76p9OjN06+J234qNN6/0Tp/WC9zZ7Dirj0M9FJ0Yc9FJ0L+wVs+jv0Y/oPoqekVr+oY/qD6RrRanqgMItm6Vi66t14A6fzSn6fNAaU/P1bnqrSgMvTSu+uWgJZeiXVACmT//Z"
                    className="object-cover"
                />
            </motion.div>
        </div>
    );
};

export default ProfileImage;
