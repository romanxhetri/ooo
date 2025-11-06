
import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { CartItem, MenuItem, Customization } from '../types';

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: MenuItem, quantity: number, customizations: Customization[]) => void;
    removeFromCart: (itemId: string, customizations: Customization[]) => void;
    updateQuantity: (itemId: string, customizations: Customization[], newQuantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cartItems', []);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cartItems.reduce((acc, item) => {
        const customPrice = item.customizations.reduce((cAcc, c) => c.selected ? cAcc + c.price : cAcc, 0);
        return acc + (item.menuItem.price + customPrice) * item.quantity;
    }, 0);

    const getCustomizationId = (customizations: Customization[]) => {
        return customizations
            .filter(c => c.selected)
            .map(c => c.name)
            .sort()
            .join(',');
    };

    const addToCart = (menuItem: MenuItem, quantity: number, customizations: Customization[]) => {
        setCartItems(prevItems => {
            const customId = getCustomizationId(customizations);
            const existingItemIndex = prevItems.findIndex(
                item => item.menuItem.id === menuItem.id && getCustomizationId(item.customizations) === customId
            );

            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                return [...prevItems, { menuItem, quantity, customizations }];
            }
        });
    };

    const removeFromCart = (itemId: string, customizations: Customization[]) => {
        const customId = getCustomizationId(customizations);
        setCartItems(prevItems => prevItems.filter(
            item => !(item.menuItem.id === itemId && getCustomizationId(item.customizations) === customId)
        ));
    };

    const updateQuantity = (itemId: string, customizations: Customization[], newQuantity: number) => {
        const customId = getCustomizationId(customizations);
        if (newQuantity <= 0) {
            removeFromCart(itemId, customizations);
            return;
        }
        setCartItems(prevItems => prevItems.map(
            item => (item.menuItem.id === itemId && getCustomizationId(item.customizations) === customId)
                ? { ...item, quantity: newQuantity }
                : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const value = { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
   