
import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseIcon } from './icons';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-cream rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative"
                    >
                        <div className="p-6 border-b border-orange-200 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-brand-dark">{title}</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-brand-orange transition-colors rounded-full p-1"
                                aria-label="Close modal"
                            >
                                <CloseIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="overflow-y-auto p-6">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
    