import React from 'react';
// FIX: Import the `Transition` type from framer-motion to correctly type the animation transition object.
import { AnimatePresence, motion, Transition } from 'framer-motion';
import { useAppState } from '../context/AppContext';
import { Page } from '../types';

import Header from '../components/Header';
import Footer from '../components/Footer';
import CartSidebar from '../components/CartSidebar';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import ReservationsPage from './ReservationsPage';
import GalleryPage from './GalleryPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
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

// FIX: Explicitly type `pageTransition` with the `Transition` type from framer-motion.
// This resolves the error where TypeScript inferred the 'type' property as a generic 'string' instead of the required literal 'tween'.
const pageTransition: Transition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const MainApp: React.FC = () => {
    const { currentPage } = useAppState();

    const renderPage = () => {
        switch (currentPage) {
            case Page.Home:
                return <HomePage />;
            case Page.Menu:
                return <MenuPage />;
            case Page.Reservations:
                return <ReservationsPage />;
            case Page.Gallery:
                return <GalleryPage />;
            case Page.About:
                return <AboutPage />;
            case Page.Contact:
                return <ContactPage />;
            case Page.Checkout:
                return <CheckoutPage />;
            case Page.OrderTracking:
                return <OrderTrackingPage />;
            case Page.Profile:
                return <UserProfilePage />;
            case Page.Leaderboard:
                return <LeaderboardPage />;
            default:
                return <HomePage />;
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