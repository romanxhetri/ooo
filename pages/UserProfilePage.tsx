
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { useAppState } from '../context/AppContext';
import { Order, Page } from '../types';
import { POTATO_AVATAR_ACCESSORIES } from '../constants';
import { motion } from 'framer-motion';

const PotatoAvatar: React.FC<{ accessories: string[] }> = ({ accessories }) => {
    return (
        <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-yellow-300 rounded-full border-4 border-yellow-500 transform -rotate-12"></div>
            <div className="absolute inset-2 bg-yellow-400 rounded-full flex items-center justify-center">
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-brand-dark rounded-full"></div>
                    <div className="w-3 h-3 bg-brand-dark rounded-full"></div>
                </div>
            </div>
            {accessories.map(acc => (
                <div key={acc} className="absolute text-3xl" style={{ top: '-10px', left: '50%', transform: 'translateX(-50%)' }}>
                    {POTATO_AVATAR_ACCESSORIES[acc]}
                </div>
            ))}
        </div>
    );
};

const UserProfilePage: React.FC = () => {
    const { currentUser } = useAuth();
    const { getOrdersForCurrentUser } = useOrders();
    const { badges } = useData();
    const { addToCart } = useCart();
    const { navigateTo, setIsCartOpen } = useAppState();

    const userOrders = getOrdersForCurrentUser();

    if (!currentUser || currentUser.id === 'guest') {
        return <div className="text-center py-20">Please log in to see your profile.</div>;
    }

    const handleReorder = (order: Order) => {
        order.items.forEach(item => {
            addToCart(item.menuItem, item.quantity, item.customizations);
        });
        setIsCartOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-brand-light p-6 rounded-lg shadow-md text-center sticky top-24">
                        <PotatoAvatar accessories={currentUser.unlockedAccessories} />
                        <h2 className="text-2xl font-bold mt-4">{currentUser.name}</h2>
                        <p className="text-gray-600">{currentUser.email}</p>
                        <div className="mt-4 bg-orange-100 p-4 rounded-lg">
                            <p className="text-sm font-semibold text-brand-orange uppercase">Spud Points</p>
                            <p className="text-4xl font-extrabold text-brand-orange">{currentUser.spudPoints}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Badges & Order History */}
                <div className="lg:col-span-2">
                    {/* Badges Section */}
                    <div className="bg-brand-light p-6 rounded-lg shadow-md mb-8">
                        <h3 className="text-xl font-bold mb-4">Your Badges</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {badges.map(badge => {
                                const isUnlocked = currentUser.unlockedBadges.includes(badge.id);
                                return (
                                    <div key={badge.id} className={`p-4 rounded-lg text-center ${isUnlocked ? 'bg-green-100 border-2 border-brand-green' : 'bg-gray-100 opacity-60'}`}>
                                        <div className="text-4xl">{badge.icon}</div>
                                        <p className="font-semibold mt-2 text-sm">{badge.name}</p>
                                        <p className="text-xs text-gray-500">{badge.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order History Section */}
                    <div className="bg-brand-light p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-4">Order History</h3>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {userOrders.length > 0 ? userOrders.map(order => (
                                <div key={order.id} className="border p-4 rounded-md bg-white">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold">Order #{order.id.slice(-6)}</p>
                                            <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">{order.status}</span>
                                        </div>
                                    </div>
                                    <div className="text-sm mt-2 text-gray-600">
                                        {order.items.map(item => `${item.quantity}x ${item.menuItem.name}`).join(', ')}
                                    </div>
                                    <button onClick={() => handleReorder(order)} className="mt-2 text-sm font-semibold text-brand-green hover:underline">
                                        Reorder
                                    </button>
                                </div>
                            )) : (
                                <p className="text-gray-500">No past orders found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
    