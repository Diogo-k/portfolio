'use client';

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import { Text, Button } from '@/components';
import { X } from '@/assets';

/**
 * Modal component that displays a modal dialog with a backdrop and a close button.
 *
 * @param {Object} props - The component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {function} props.onClose - The function to call when the modal is closed
 * @param {string} props.title - The title of the modal
 */
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    className = '',
    ariaLabel,
}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                        role="presentation"
                        aria-hidden="true"
                    />

                    {/* Modal */}
                    <div className="fixed left-1/2 top-1/2 z-[101] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            ref={modalRef}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className={`rounded-xl bg-surface-light p-6 shadow-xl dark:bg-surface-dark ${className}`}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={ariaLabel}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <Text
                                    as="h2"
                                    size="text-2xl"
                                    weight="font-bold"
                                    id={ariaLabel}
                                >
                                    {title}
                                </Text>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onClose}
                                    aria-label="Close modal"
                                    className="rounded-full p-2"
                                >
                                    <X className="size-5" />
                                </Button>
                            </div>

                            <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    ariaLabel: PropTypes.string.isRequired,
};

export default Modal;
