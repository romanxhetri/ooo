
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useAppState } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { StarIcon, PlusIcon, MinusIcon } from './icons';
import { Customization } from '../types';
import { motion } from 'framer-motion';

const MenuItemModal: React.FC = () => {
    const { isMenuItemModalOpen, closeMenuItemModal, selectedMenuItem } = useAppState();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [customizations, setCustomizations] = useState<Customization[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (selectedMenuItem) {
            setQuantity(1);
            const initialCustomizations = selectedMenuItem.customizations.map(c => ({ ...c, selected: false }));
            setCustomizations(initialCustomizations);
        }
    }, [selectedMenuItem]);

    useEffect(() => {
        if (selectedMenuItem) {
            const basePrice = selectedMenuItem.price;
            const customPrice = customizations.reduce((acc, cust) => cust.selected ? acc + cust.price : acc, 0);
            setTotalPrice((basePrice + customPrice) * quantity);
        }
    }, [selectedMenuItem, quantity, customizations]);


    if (!selectedMenuItem) return null;

    const handleAddToCart = () => {
        addToCart(selectedMenuItem, quantity, customizations);
        closeMenuItemModal();
    };
    
    const handleCustomizationChange = (index: number) => {
        const newCustomizations = [...customizations];
        newCustomizations[index].selected = !newCustomizations[index].selected;
        setCustomizations(newCustomizations);
    };

    return (
        <Modal isOpen={isMenuItemModalOpen} onClose={closeMenuItemModal} title={selectedMenuItem.name}>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <img src={selectedMenuItem.imageUrl} alt={selectedMenuItem.name} className="w-full h-64 object-cover rounded-lg shadow-md" />
                     <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-bold mb-2">Nutritional Info (per serving)</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                            <p><strong>Calories:</strong> {selectedMenuItem.nutrition.calories}</p>
                            <p><strong>Protein:</strong> {selectedMenuItem.nutrition.protein}g</p>
                            <p><strong>Carbs:</strong> {selectedMenuItem.nutrition.carbs}g</p>
                            <p><strong>Fat:</strong> {selectedMenuItem.nutrition.fat}g</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="text-gray-600 mb-4">{selectedMenuItem.description}</p>
                    
                    {customizations.length > 0 && (
                        <div className="mb-4">
                            <h4 className="font-bold mb-2">Customize your order</h4>
                            <div className="space-y-2">
                                {customizations.map((cust, index) => (
                                    <label key={cust.name} className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200 cursor-pointer hover:border-brand-orange">
                                        <div>
                                            <span className="font-medium text-brand-dark">{cust.name}</span>
                                            <span className="text-sm text-brand-green ml-2">+${cust.price.toFixed(2)}</span>
                                        </div>
                                        <input type="checkbox" checked={cust.selected} onChange={() => handleCustomizationChange(index)} className="form-checkbox h-5 w-5 text-brand-orange rounded focus:ring-brand-orange" />
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between my-6">
                        <p className="text-lg font-semibold">Quantity</p>
                        <div className="flex items-center border border-gray-300 rounded-full">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 text-gray-600 hover:text-brand-orange"><MinusIcon className="w-5 h-5" /></button>
                            <span className="px-4 text-lg font-medium">{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)} className="p-2 text-gray-600 hover:text-brand-orange"><PlusIcon className="w-5 h-5" /></button>
                        </div>
                    </div>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddToCart}
                        className="w-full bg-brand-green text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-300"
                    >
                        Add to Cart - ${totalPrice.toFixed(2)}
                    </motion.button>
                </div>
            </div>
            <div className="mt-6 border-t pt-4">
                <h4 className="font-bold mb-2 text-lg">Reviews</h4>
                {selectedMenuItem.reviews.length > 0 ? (
                    selectedMenuItem.reviews.map((review, i) => (
                        <div key={i} className="mb-2 p-3 bg-white rounded-lg">
                            <div className="flex justify-between">
                                <span className="font-semibold">{review.author}</span>
                                <div className="flex items-center">
                                    {[...Array(review.rating)].map((_, j) => <StarIcon key={j} className="w-4 h-4 text-yellow-400" />)}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm italic">"{review.comment}"</p>
                        </div>
                    ))
                ) : <p className="text-gray-500">No reviews yet.</p>}
            </div>
        </Modal>
    );
};

export default MenuItemModal;
    