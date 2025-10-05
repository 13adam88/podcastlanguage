import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: {
                type: 'spring',
                stiffness: 260,
                damping: 20
            }
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={backdropVariants}
                    onClick={onClose}
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-8 border border-slate-700 relative text-center"
                        variants={modalVariants}
                        exit="exit"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <button
                          onClick={onClose}
                          className="absolute top-4 right-4 text-slate-500 hover:text-slate-200 transition-colors"
                          aria-label="Close welcome message"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-4">
                            Welcome to Global Podcast Hub!
                        </h2>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Your gateway to discovering captivating podcasts from every corner of the globe. Select a language to begin your journey and find your next favorite show.
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-teal-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-teal-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-400 shadow-lg hover:shadow-teal-500/50 transform hover:scale-105"
                        >
                            Get Started
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};