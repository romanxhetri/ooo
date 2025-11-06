import React from 'react';
import { motion } from 'framer-motion';
import { useAppState } from '../context/AppContext';
import { useData } from '../context/DataContext';
import { Page } from '../types';
import MenuItemCard from '../components/MenuItemCard';
import { ArrowRightIcon } from '../components/icons';

const HomePage: React.FC = () => {
    const { navigateTo } = useAppState();
    const { menuItems } = useData();

    const featuredItems = menuItems.slice(0, 3);

    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594212699903-ec8a3e501716?q=80&w=2574&auto=format&fit=crop')" }}>
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-extrabold"
                    >
                        Potato & Friends
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-4 text-xl md:text-2xl max-w-2xl"
                    >
                        Where every fry tells a story.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }} 
                        className="mt-8 flex flex-col sm:flex-row gap-4"
                    >
                        <button onClick={() => navigateTo(Page.Menu)} className="bg-brand-orange text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-amber-500 transition-transform transform hover:scale-105">
                            Explore Menu
                        </button>
                        <button onClick={() => navigateTo(Page.Reservations)} className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-brand-dark transition-all">
                            Book a Table
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Featured Items Section */}
            <div className="py-20 bg-brand-light">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-extrabold text-brand-dark">Our Most Popular Fries</h2>
                    <p className="mt-2 text-gray-600 max-w-xl mx-auto">Handpicked by our customers, these are the legends of our menu.</p>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredItems.map(item => <MenuItemCard key={item.id} item={item} />)}
                    </div>
                    <button onClick={() => navigateTo(Page.Menu)} className="mt-12 bg-brand-green text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-emerald-600 transition-all group flex items-center justify-center mx-auto w-fit">
                        See Full Menu <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
            
            {/* About Us Teaser */}
            <div className="py-20 bg-cream">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-extrabold text-brand-dark">Our Spud-tacular Story</h2>
                        <p className="mt-4 text-gray-700 leading-relaxed">
                            It all started with a simple potato and a big dream. A dream to create the most delicious, creative, and unforgettable loaded fries the world has ever seen. At Potato & Friends, we're more than just a restaurant; we're a community of food lovers passionate about quality ingredients and bold flavors.
                        </p>
                        <button onClick={() => navigateTo(Page.About)} className="mt-6 bg-brand-dark text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors">
                            Read More
                        </button>
                    </div>
                    <div>
                        <img src="https://picsum.photos/seed/restaurant-interior/600/400" alt="Restaurant Interior" className="rounded-lg shadow-xl"/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default HomePage;
