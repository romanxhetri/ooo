import React, { useState, useEffect, useMemo } from 'react';
import { useOrders } from '../context/OrderContext';
import { Order, OrderStatus, OrderType, Page } from '../types';
import { motion } from 'framer-motion';
import { useAppState } from '../context/AppContext';

const statusStepsDelivery = [OrderStatus.Confirmed, OrderStatus.Preparing, OrderStatus.OutForDelivery, OrderStatus.Delivered];
const statusStepsPickup = [OrderStatus.Confirmed, OrderStatus.Preparing, OrderStatus.ReadyForPickup, OrderStatus.PickedUp];

const OrderTrackingPage: React.FC = () => {
    const { getOrdersForCurrentUser } = useOrders();
    const { confirmedOrder, navigateTo } = useAppState();
    const [latestOrder, setLatestOrder] = useState<Order | null>(null);

    useEffect(() => {
        const userOrders = getOrdersForCurrentUser();
        if (confirmedOrder) {
            setLatestOrder(confirmedOrder);
        } else if (userOrders.length > 0) {
            setLatestOrder(userOrders[0]);
        }
    }, [confirmedOrder, getOrdersForCurrentUser]);

    // Simulate order progress for demo
    useEffect(() => {
        if (latestOrder && latestOrder.status !== OrderStatus.Delivered && latestOrder.status !== OrderStatus.PickedUp) {
            const steps = latestOrder.type === OrderType.Delivery ? statusStepsDelivery : statusStepsPickup;
            const currentIndex = steps.indexOf(latestOrder.status);
            
            if (currentIndex < steps.length - 1) {
                const timer = setTimeout(() => {
                    setLatestOrder(prev => prev ? { ...prev, status: steps[currentIndex + 1] } : null);
                }, 5000); // Progress every 5 seconds
                return () => clearTimeout(timer);
            }
        }
    }, [latestOrder]);

    if (!latestOrder) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold">No Order to Track</h1>
                <p className="mt-4 text-gray-600">You haven't placed any orders yet.</p>
                <button onClick={() => navigateTo(Page.Menu)} className="mt-6 bg-brand-orange text-white font-bold py-3 px-6 rounded-lg hover:bg-amber-500">
                    Order Now
                </button>
            </div>
        );
    }
    
    const statusSteps = latestOrder.type === OrderType.Delivery ? statusStepsDelivery : statusStepsPickup;
    const currentStepIndex = statusSteps.indexOf(latestOrder.status);

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-4 text-brand-orange text-glow">Track Your Order</h1>
            <p className="text-center text-gray-600 mb-8">Order ID: <span className="font-semibold text-brand-orange">{latestOrder.id}</span></p>

            <div className="max-w-4xl mx-auto bg-brand-light p-8 rounded-lg shadow-md">
                {/* Progress Bar */}
                <div className="flex items-center">
                    {statusSteps.map((step, index) => (
                        <React.Fragment key={step}>
                            <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${index <= currentStepIndex ? 'bg-brand-green text-white' : 'bg-gray-300 text-gray-500'}`}>
                                    {index <= currentStepIndex ? '✓' : index + 1}
                                </div>
                                <p className={`mt-2 text-xs text-center font-semibold ${index <= currentStepIndex ? 'text-brand-green' : 'text-gray-500'}`}>{step}</p>
                            </div>
                            {index < statusSteps.length - 1 && (
                                <div className="flex-1 h-1 bg-gray-300 mx-2 relative">
                                    <motion.div 
                                        className="h-full bg-brand-green"
                                        initial={{ width: 0 }}
                                        animate={{ width: index < currentStepIndex ? '100%' : '0%' }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                
                {/* Map for Delivery */}
                {latestOrder.type === OrderType.Delivery && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Live Tracking</h2>
                        <div className="relative w-full h-64 bg-orange-100 rounded-lg overflow-hidden border-2 border-orange-200">
                            {/* Mock Map Background */}
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F59E0B' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
                            
                            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-center">
                                <span className="text-4xl">🏠</span>
                                <p className="text-xs font-bold">Restaurant</p>
                            </div>
                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-center">
                                <span className="text-4xl">📍</span>
                                <p className="text-xs font-bold">Your Location</p>
                            </div>

                            {latestOrder.status === OrderStatus.OutForDelivery && (
                                <motion.div
                                    className="absolute top-1/2 -mt-4"
                                    initial={{ left: '10%' }}
                                    animate={{ left: '80%' }}
                                    transition={{ duration: 30, repeat: Infinity, repeatType: "loop", ease: "linear" }}
                                >
                                    <span className="text-4xl">🛵</span>
                                </motion.div>
                            )}
                             {latestOrder.status === OrderStatus.Delivered && (
                                <div className="absolute top-1/2 right-12 -mt-4">
                                    <span className="text-4xl">🛵</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                 {latestOrder.status === OrderStatus.ReadyForPickup && (
                    <div className="mt-12 text-center p-6 bg-green-100 text-green-800 rounded-lg">
                        <h3 className="text-xl font-bold">Your order is ready for pickup!</h3>
                        <p>Please head to our location to get your delicious food.</p>
                    </div>
                 )}
            </div>
        </div>
    );
};

export default OrderTrackingPage;