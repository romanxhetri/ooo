
import React from 'react';
import Modal from './Modal';
import { useAppState } from '../context/AppContext';
import { Page } from '../types';
import { CheckCircleIcon, ArrowRightIcon } from './icons';
import { motion } from 'framer-motion';

const OrderConfirmationModal: React.FC = () => {
    const { isOrderConfirmationOpen, closeOrderConfirmation, confirmedOrder, navigateTo } = useAppState();

    if (!confirmedOrder) return null;

    const handleTrackOrder = () => {
        navigateTo(Page.OrderTracking);
        closeOrderConfirmation();
    };

    const handleBackToMenu = () => {
        navigateTo(Page.Menu);
        closeOrderConfirmation();
    };

    return (
        <Modal isOpen={isOrderConfirmationOpen} onClose={handleBackToMenu} title="Order Placed Successfully!">
            <div className="text-center p-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                >
                    <CheckCircleIcon className="w-24 h-24 text-brand-green mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold text-brand-dark">Thank you for your order!</h3>
                <p className="text-gray-600 mt-2">Your order ID is: <span className="font-bold text-brand-orange">{confirmedOrder.id}</span></p>
                <p className="text-gray-500 mt-1">We've started preparing your delicious food.</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={handleTrackOrder}
                        className="w-full sm:w-auto bg-brand-green text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center group"
                    >
                        Track Your Order
                        <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={handleBackToMenu}
                        className="w-full sm:w-auto bg-orange-100 text-brand-orange font-bold py-3 px-6 rounded-lg hover:bg-orange-200 transition-colors"
                    >
                        Back to Menu
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default OrderConfirmationModal;
    