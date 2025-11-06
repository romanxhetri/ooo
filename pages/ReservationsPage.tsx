import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Reservation } from '../types';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const ReservationsPage: React.FC = () => {
    const { reservations, setReservations } = useData();
    const { currentUser } = useAuth();
    
    const [name, setName] = useState(currentUser?.name || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('18:00');
    const [partySize, setPartySize] = useState(2);
    const [specialRequest, setSpecialRequest] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newReservation: Reservation = {
            id: `res-${Date.now()}`,
            userId: currentUser?.id || 'guest',
            name,
            email,
            phone,
            date,
            time,
            partySize,
            specialRequest,
        };
        setReservations([...reservations, newReservation]);
        setIsConfirmed(true);
    };
    
    if (isConfirmed) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <h1 className="text-4xl font-bold text-brand-green">Reservation Confirmed!</h1>
                    <p className="mt-4 text-lg text-gray-700">Thank you, {name}. We've sent a confirmation to {email}.</p>
                    <p className="mt-2">We look forward to seeing you on {new Date(date).toLocaleDateString()} at {time}.</p>
                    <button onClick={() => setIsConfirmed(false)} className="mt-8 bg-brand-orange text-white font-bold py-3 px-6 rounded-lg">
                        Make Another Reservation
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-brand-light py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">Book Your Table</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Reserve your spot and get ready for a delicious experience. We can't wait to serve you!
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-12 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                         <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange" />
                         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange" />
                         <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange" />
                         <input type="number" placeholder="Party Size" value={partySize} min="1" max="12" onChange={e => setPartySize(parseInt(e.target.value))} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange" />
                         <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange" />
                         <input type="time" value={time} onChange={e => setTime(e.target.value)} required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange" />
                    </div>
                    <textarea placeholder="Special requests? (e.g., birthday, allergies)" value={specialRequest} onChange={e => setSpecialRequest(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"></textarea>
                    <button type="submit" className="w-full bg-brand-green text-white font-bold py-3 rounded-lg text-lg hover:bg-emerald-600 transition-colors">
                        Confirm Reservation
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReservationsPage;
