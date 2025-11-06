
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { useAppState } from '../context/AppContext';
import { DietaryTag, MenuItem } from '../types';
import MenuItemCard from '../components/MenuItemCard';
import { MENU_CATEGORIES } from '../constants';
import { motion } from 'framer-motion';
import { StarIcon, SearchIcon } from '../components/icons';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const DailySpecialCard: React.FC<{ item: MenuItem }> = ({ item }) => {
    const { openMenuItemModal } = useAppState();
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-amber-400 to-brand-orange rounded-2xl shadow-xl p-6 md:p-8 text-white grid md:grid-cols-2 gap-6 items-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => openMenuItemModal(item)}
        >
            <div>
                <h2 className="text-sm font-bold uppercase tracking-widest">Daily Special</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold mt-1">{item.name}</h3>
                <p className="mt-2 text-amber-100">{item.description}</p>
                <div className="flex items-center mt-4">
                    <span className="text-2xl font-bold bg-white text-brand-orange px-3 py-1 rounded-md mr-4">${(item.price * 0.8).toFixed(2)}</span>
                    <span className="line-through text-amber-200">${item.price.toFixed(2)}</span>
                    <span className="ml-2 font-semibold text-white bg-red-500 px-2 py-0.5 rounded-full text-sm">20% OFF</span>
                </div>
            </div>
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 rounded-lg object-cover shadow-lg"/>
        </motion.div>
    );
};

const MenuPage: React.FC = () => {
    const { menuItems, dailySpecialId } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedDiets, setSelectedDiets] = useState<DietaryTag[]>([]);

    const dailySpecialItem = menuItems.find(item => item.id === dailySpecialId);

    const filteredItems = useMemo(() => {
        return menuItems.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
            const matchesDiet = selectedDiets.length > 0 ? selectedDiets.every(diet => item.dietaryTags.includes(diet)) : true;
            return item.isAvailable && matchesSearch && matchesCategory && matchesDiet;
        });
    }, [menuItems, searchTerm, selectedCategory, selectedDiets]);

    const handleDietToggle = (diet: DietaryTag) => {
        setSelectedDiets(prev => prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]);
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="bg-brand-light text-center py-16 px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-extrabold text-brand-dark"
                >
                    Discover Your New Favorite Fries
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
                >
                    From classic cheesy to spicy volcano, every bite is a flavor adventure.
                </motion.p>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Daily Special */}
                {dailySpecialItem && <DailySpecialCard item={dailySpecialItem} />}

                {/* Filters */}
                <div className="my-12">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
                        <div className="relative flex-grow max-w-md">
                            <input
                                type="text"
                                placeholder="Search for your favorite fry..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-orange-200 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Object.values(DietaryTag).map(diet => (
                                <button
                                    key={diet}
                                    onClick={() => handleDietToggle(diet)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedDiets.includes(diet) ? 'bg-brand-green text-white' : 'bg-white text-gray-700 hover:bg-orange-100'}`}
                                >
                                    {diet}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedCategory === null ? 'bg-brand-orange text-white' : 'bg-white text-gray-700 hover:bg-orange-100'}`}
                        >
                            All
                        </button>
                        {MENU_CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${selectedCategory === cat ? 'bg-brand-orange text-white' : 'bg-white text-gray-700 hover:bg-orange-100'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {filteredItems.map(item => <MenuItemCard key={item.id} item={item} />)}
                </motion.div>
                {filteredItems.length === 0 && (
                    <div className="text-center py-16">
                         <p className="text-4xl">🥔</p>
                        <p className="mt-4 text-xl text-gray-600">No fries found!</p>
                        <p className="text-gray-500">Try adjusting your filters or search term.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuPage;
    