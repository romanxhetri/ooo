
import React from 'react';
import { MenuItem, DietaryTag } from '../types';
import { StarIcon, FlameIcon, VegetarianIcon, VeganIcon, GlutenFreeIcon } from './icons';
import { motion } from 'framer-motion';
import { useAppState } from '../context/AppContext';

interface MenuItemCardProps {
    item: MenuItem;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const DietaryIcon: React.FC<{ tag: DietaryTag }> = ({ tag }) => {
    const commonClasses = "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2";
    switch (tag) {
        case DietaryTag.Vegetarian:
            return <div className={`${commonClasses} bg-green-100 text-green-700 border-green-700`} title="Vegetarian">V</div>;
        case DietaryTag.Vegan:
            return <div className={`${commonClasses} bg-emerald-100 text-emerald-700 border-emerald-700`} title="Vegan">VG</div>;
        case DietaryTag.GlutenFree:
            return <div className={`${commonClasses} bg-sky-100 text-sky-700 border-sky-700`} title="Gluten-Free">GF</div>;
        default:
            return null;
    }
};

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
    const { openMenuItemModal } = useAppState();

    return (
        <motion.div
            variants={cardVariants}
            className="bg-brand-light rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col cursor-pointer"
            onClick={() => openMenuItemModal(item)}
        >
            <div className="relative">
                <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
                <div className="absolute top-3 right-3 flex items-center bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold">
                    <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{item.rating.toFixed(1)}</span>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-brand-dark mb-1">{item.name}</h3>
                <p className="text-gray-600 text-sm flex-grow">{item.description.substring(0, 60)}...</p>
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-lg font-extrabold text-brand-green">${item.price.toFixed(2)}</p>
                    <div className="flex items-center space-x-2">
                        {item.dietaryTags.map(tag => <DietaryIcon key={tag} tag={tag} />)}
                        {item.isSpicy && <div className="w-7 h-7 rounded-full flex items-center justify-center bg-red-100 border-2 border-red-500" title="Spicy"><FlameIcon className="w-4 h-4 text-red-500" /></div>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default MenuItemCard;
    