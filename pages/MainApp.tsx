
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppState } from '../context/AppContext';
import { Page } from '../types';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import MenuPage from './MenuPage';
import CheckoutPage from './CheckoutPage';
import OrderTrackingPage from './OrderTrackingPage';
import UserProfilePage from './UserProfilePage';
import LeaderboardPage from './LeaderboardPage';
import MenuItemModal from '../components/MenuItemModal';
import OrderConfirmationModal from '../components/OrderConfirmationModal';
import AiFeatureModal from '../components/AiModals';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const MainApp: React.FC = () => {
    const { currentPage } = useAppState();

    const renderPage = () => {
        switch (currentPage) {
            case Page.Menu:
                return <MenuPage />;
            case Page.Checkout:
                return <CheckoutPage />;
            case Page.OrderTracking:
                return <OrderTrackingPage />;
            case Page.Profile:
                return <UserProfilePage />;
            case Page.Leaderboard:
                return <LeaderboardPage />;
            default:
                return <MenuPage />;
        }
    };

    return (
        <div className="bg-cream min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={pageVariants}
                        transition={pageTransition}
                    >
                        {renderPage()}
                    </motion.div>
                </AnimatePresence>
            </main>
            <Footer />
            <CartSidebar />
            <MenuItemModal />
            <OrderConfirmationModal />
            <AiFeatureModal />
        </div>
    );
};

export default MainApp;
    