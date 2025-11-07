
import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Order, CartItem, OrderType, OrderStatus, User, Badge } from '../types';
import { useAuth } from './AuthContext';
import { useData } from './DataContext';

interface OrderContextType {
    orders: Order[];
    placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
    getOrdersForCurrentUser: () => Order[];
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
    const { currentUser, updateUser } = useAuth();
    const { badges } = useData();
    
    const placeOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order => {
        const newOrder: Order = {
            ...orderData,
            id: `order-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: orderData.type === OrderType.Delivery ? OrderStatus.Confirmed : OrderStatus.Confirmed
        };

        setOrders(prevOrders => [...prevOrders, newOrder]);
        
        if (currentUser && currentUser.id !== 'guest') {
            const pointsEarned = Math.floor(orderData.subtotal);
            const updatedUser: User = { 
                ...currentUser, 
                spudPoints: currentUser.spudPoints + pointsEarned - orderData.pointsUsed 
            };
            
            // Check for 'First Fry' badge
            const userOrders = orders.filter(o => o.userId === currentUser.id);
            if (userOrders.length === 0 && !currentUser.unlockedBadges.includes('b-01')) {
                updatedUser.unlockedBadges.push('b-01');
            }
            
            // Check for 'Spud Saver' badge
            if (orderData.pointsUsed > 0 && !currentUser.unlockedBadges.includes('b-03')) {
                updatedUser.unlockedBadges.push('b-03');
            }

            updateUser(updatedUser);
        }

        return newOrder;
    };
    
    const getOrdersForCurrentUser = (): Order[] => {
        if (!currentUser || currentUser.id === 'guest') return [];
        return orders.filter(order => order.userId === currentUser.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    };

    const updateOrderStatus = (orderId: string, status: OrderStatus) => {
        setOrders(prevOrders => prevOrders.map(order =>
            order.id === orderId ? { ...order, status } : order
        ));
    };

    const value = { orders, placeOrder, getOrdersForCurrentUser, updateOrderStatus };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = (): OrderContextType => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};