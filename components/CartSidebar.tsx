
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppState } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types';
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon, ArrowRightIcon } from './icons';
import { Page } from '../types';

const CartSidebar: React.FC = () => {
    const { isCartOpen, setIsCartOpen, navigateTo } = useAppState();
    const { cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigateTo(Page.Checkout);
    };

    const CartItemCard: React.FC<{ item: CartItem }> = ({ item }) => {
        const selectedCustomizations = item.customizations.filter(c => c.selected);
        const customizationPrice = selectedCustomizations.reduce((acc, c) => acc + c.price, 0);
        const itemTotal = (item.menuItem.price + customizationPrice) * item.quantity;

        return (
            <div className="flex py-4 border-b border-orange-200">
                <img src={item.menuItem.imageUrl} alt={item.menuItem.name} className="w-20 h-20 rounded-md object-cover" />
                <div className="ml-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h4 className="font-semibold text-brand-dark">{item.menuItem.name}</h4>
                        {selectedCustomizations.length > 0 && (
                            <p className="text-xs text-gray-500">
                                {selectedCustomizations.map(c => c.name).join(', ')}
                            </p>
                        )}
                        <p className="text-sm font-bold text-brand-orange">${itemTotal.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-gray-300 rounded-full">
                            <button onClick={() => updateQuantity(item.menuItem.id, item.customizations, item.quantity - 1)} className="p-1 text-gray-600 hover:text-brand-orange"><MinusIcon className="w-4 h-4" /></button>
                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.menuItem.id, item.customizations, item.quantity + 1)} className="p-1 text-gray-600 hover:text-brand-orange"><PlusIcon className="w-4 h-4" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.menuItem.id, item.customizations)} className="text-gray-400 hover:text-red-500"><TrashIcon className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50"
                    onClick={() => setIsCartOpen(false)}
                >
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: '0%' }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="absolute right-0 top-0 h-full w-full max-w-md bg-cream/95 backdrop-blur-lg shadow-2xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-6 border-b border-orange-200">
                            <h2 className="text-2xl font-bold">Your Cart</h2>
                            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-brand-orange"><CloseIcon className="w-6 h-6" /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6">
                            {cartItems.length > 0 ? (
                                cartItems.map((item, index) => <CartItemCard key={`${item.menuItem.id}-${index}`} item={item} />)
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-4xl">🍟</p>
                                    <p className="mt-4 text-gray-600">Your cart is empty.</p>
                                    <p className="text-sm text-gray-500">Time to add some deliciousness!</p>
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-orange-200 bg-brand-light">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-medium text-gray-700">Total</span>
                                    <span className="text-2xl font-bold text-brand-dark">${cartTotal.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-brand-green text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center group"
                                >
                                    Proceed to Checkout
                                    <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;