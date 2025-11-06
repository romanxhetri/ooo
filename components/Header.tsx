import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { Page } from '../types';
import { CartIcon, UserIcon, ChevronDownIcon, LogoutIcon } from './icons';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
    const { currentUser, logout } = useAuth();
    const { navigateTo, setIsCartOpen, setActiveAiModal } = useAppState();
    const { cartCount } = useCart();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navLinks = [
        { name: 'Home', page: Page.Home },
        { name: 'Menu', page: Page.Menu },
        { name: 'Reservations', page: Page.Reservations },
        { name: 'Gallery', page: Page.Gallery },
        { name: 'About', page: Page.About },
        { name: 'Contact', page: Page.Contact },
    ];

    const handleNavigation = (page: Page) => {
        navigateTo(page);
        setIsProfileOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
    }

    return (
        <header className="fixed top-0 left-0 right-0 bg-cream/80 backdrop-blur-md shadow-md z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 cursor-pointer" onClick={() => navigateTo(Page.Home)}>
                        <span className="text-2xl font-extrabold text-brand-dark">Potato & Friends</span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => navigateTo(link.page)}
                                className="text-gray-600 hover:text-brand-orange font-medium transition-colors"
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <button onClick={() => setIsCartOpen(true)} className="relative text-gray-600 hover:text-brand-orange transition-colors">
                            <CartIcon className="w-7 h-7" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        <div className="relative" ref={profileRef}>
                            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center text-gray-600 hover:text-brand-orange transition-colors">
                                <UserIcon className="w-7 h-7" />
                                <ChevronDownIcon className={`w-4 h-4 ml-1 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 origin-top-right"
                                    >
                                        <div className="px-4 py-2 border-b">
                                            <p className="font-semibold text-brand-dark">{currentUser?.name}</p>
                                            <p className="text-sm text-gray-500">{currentUser?.email}</p>
                                        </div>
                                        {currentUser?.id !== 'guest' && (
                                        <>
                                            <button onClick={() => handleNavigation(Page.Profile)} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100">
                                                My Profile
                                            </button>
                                            <button onClick={() => handleNavigation(Page.Leaderboard)} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100">
                                                Leaderboard
                                            </button>
                                        </>
                                        )}
                                        <button onClick={() => setActiveAiModal('chef')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100">Ask the Chef</button>
                                        <button onClick={() => setActiveAiModal('assistant')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100">AI Assistant</button>
                                        <button onClick={() => setActiveAiModal('voice')} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-100">Voice Ordering</button>
                                        <div className="border-t my-1"></div>
                                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 flex items-center">
                                            <LogoutIcon className="w-5 h-5 mr-2"/>
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
