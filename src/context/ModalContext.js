'use client';

import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@/components';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [modalContent, setModalContent] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (content) => {
        setModalContent(content);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);

        setTimeout(() => {
            setModalContent(null);
        }, 300);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalContent && (
                <Modal
                    isOpen={isOpen}
                    onClose={closeModal}
                    title={modalContent.title}
                    ariaLabel={modalContent.ariaLabel}
                >
                    {modalContent.children}
                </Modal>
            )}
        </ModalContext.Provider>
    );
}

ModalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
