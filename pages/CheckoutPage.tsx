import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useAppState } from '../context/AppContext';
import { useData } from '../context/DataContext';
import { OrderType } from '../types';
import { motion } from 'framer-motion';

const TAX_RATE = 0.08;
const DELIVERY_FEE = 5.00;

const CheckoutPage: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const { openOrderConfirmation } = useAppState();
    const { currentUser, updateUser } = useAuth();
    const { promoCodes } = useData();

    const [step, setStep] = useState(1);
    const [orderType, setOrderType] = useState<OrderType>(OrderType.Delivery);
    const [scheduledTime, setScheduledTime] = useState('');
    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [address, setAddress] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [pointsToUse, setPointsToUse] = useState(0);
    const [error, setError] = useState('');

    const subtotal = cartTotal;
    const discountFromPromo = subtotal * promoDiscount;
    const discountFromPoints = pointsToUse * 0.1; // 10 points = $1
    const subtotalAfterDiscounts = subtotal - discountFromPromo - discountFromPoints;
    const tax = subtotalAfterDiscounts * TAX_RATE;
    const deliveryFee = orderType === OrderType.Delivery ? DELIVERY_FEE : 0;
    const total = subtotalAfterDiscounts + tax + deliveryFee;

    const handleApplyPromo = () => {
        const foundCode = promoCodes.find(p => p.code.toUpperCase() === promoCode.toUpperCase() && p.isActive);
        if (foundCode) {
            setPromoDiscount(foundCode.discountPercentage / 100);
            setError('');
        } else {
            setPromoDiscount(0);
            setError('Invalid or expired promo code.');
        }
    };

    const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value)) value = 0;
        if (currentUser && value > currentUser.spudPoints) {
            value = currentUser.spudPoints;
        }
        if (value * 0.1 > subtotal - discountFromPromo) {
            value = Math.floor((subtotal - discountFromPromo) / 0.1);
        }
        setPointsToUse(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (orderType === OrderType.Delivery && !address) {
            alert('Please enter a delivery address.');
            return;
        }

        const newOrder = placeOrder({
            userId: currentUser?.id || 'guest',
            items: cartItems,
            subtotal: subtotal,
            tax,
            deliveryFee,
            total,
            type: orderType,
            deliveryAddress: address,
            scheduledAt: scheduledTime || undefined,
            promoCode: promoDiscount > 0 ? promoCode : undefined,
            pointsUsed: pointsToUse,
        });

        openOrderConfirmation(newOrder);
        clearCart();
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold">Your Cart is Empty</h1>
                <p className="mt-4 text-gray-600">You can't check out with an empty cart. Go add some delicious fries!</p>
            </div>
        );
    }
    
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8 text-brand-orange text-glow">Checkout</h1>
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Order Options */}
                        <div className="bg-brand-light p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-2xl font-semibold mb-4">1. Order Options</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <button type="button" onClick={() => setOrderType(OrderType.Delivery)} className={`p-4 rounded-lg border-2 text-left ${orderType === OrderType.Delivery ? 'border-brand-orange bg-orange-50' : 'border-gray-200'}`}>
                                    <h3 className="font-bold">Delivery</h3>
                                    <p className="text-sm text-gray-600">We'll bring it to you!</p>
                                </button>
                                <button type="button" onClick={() => setOrderType(OrderType.Pickup)} className={`p-4 rounded-lg border-2 text-left ${orderType === OrderType.Pickup ? 'border-brand-orange bg-orange-50' : 'border-gray-200'}`}>
                                    <h3 className="font-bold">Pickup</h3>
                                    <p className="text-sm text-gray-600">Come grab your order.</p>
                                </button>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Schedule for later (optional)</label>
                                <input
                                    type="datetime-local"
                                    value={scheduledTime}
                                    onChange={(e) => setScheduledTime(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-orange focus:ring-brand-orange sm:text-sm"
                                />
                            </div>
                        </div>

                        {/* Step 2: Your Details */}
                        <div className="bg-brand-light p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">2. Your Details</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label>Name</label>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                                </div>
                            </div>
                            {orderType === OrderType.Delivery && (
                                <div className="mt-4">
                                    <label>Delivery Address</label>
                                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} required rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
                
                {/* Order Summary */}
                <div className="bg-brand-light p-6 rounded-lg shadow-md h-fit sticky top-24">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
                    <div className="space-y-2 text-gray-600">
                        {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                                <span>{item.quantity} x {item.menuItem.name}</span>
                                <span>${(item.menuItem.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t space-y-2">
                        {currentUser?.id !== 'guest' && (
                        <div className="mt-4">
                             <label className="text-sm font-medium">Use Spud Points (10pts = $1)</label>
                             <input type="range" min="0" max={currentUser?.spudPoints} value={pointsToUse} onChange={handlePointsChange} step="10" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                             <div className="flex justify-between text-xs"><span>0</span><span>{currentUser?.spudPoints}</span></div>
                             <p className="text-center font-semibold text-brand-green">Using {pointsToUse} points for a ${discountFromPoints.toFixed(2)} discount</p>
                        </div>
                        )}
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        {promoDiscount > 0 && <div className="flex justify-between text-green-600"><span>Promo Discount</span><span>-${discountFromPromo.toFixed(2)}</span></div>}
                        {discountFromPoints > 0 && <div className="flex justify-between text-green-600"><span>Points Discount</span><span>-${discountFromPoints.toFixed(2)}</span></div>}
                        <div className="flex justify-between">
                            <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        {orderType === OrderType.Delivery && <div className="flex justify-between"><span>Delivery Fee</span><span>${deliveryFee.toFixed(2)}</span></div>}
                        <div className="flex justify-between font-bold text-xl text-brand-dark pt-2 border-t">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full mt-6 bg-brand-green text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;