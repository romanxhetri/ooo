import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';

const LoginPage: React.FC = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const { login, signup, continueAsGuest } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        let success = false;
        if (isLoginView) {
            success = login(email, password);
            if (!success) setError('Invalid email or password.');
        } else {
            success = signup(name, email, password);
            if (!success) setError('User with this email already exists.');
        }
    };

    const FormContent = () => (
        <motion.div
            key={isLoginView ? 'login' : 'signup'}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            <h2 className="text-3xl font-bold text-brand-orange text-glow mb-2">{isLoginView ? 'Welcome Back!' : 'Join the Club!'}</h2>
            <p className="text-gray-600 mb-6">{isLoginView ? 'Login to continue your fry-tastic journey.' : 'Create an account to earn Spud Points!'}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLoginView && (
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-white border border-orange-200 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                    />
                )}
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-orange-200 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white border border-orange-200 focus:outline-none focus:ring-2 focus:ring-brand-orange"
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button type="submit" className="w-full bg-brand-orange text-white font-bold py-3 rounded-lg hover:bg-amber-500 transition-colors duration-300 transform hover:scale-105">
                    {isLoginView ? 'Login' : 'Sign Up'}
                </button>
            </form>
            <p className="text-center text-sm text-gray-600 mt-4">
                {isLoginView ? "Don't have an account?" : "Already a member?"}{' '}
                <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="font-semibold text-brand-green hover:underline">
                    {isLoginView ? 'Sign Up' : 'Login'}
                </button>
            </p>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8 md:gap-16">
                <div className="text-center md:text-left">
                    <h1 className="text-5xl md:text-7xl leading-tight">
                        <span className="logo-3d">Potato & Friends</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-700">Your daily dose of delicious, loaded fries and more. Crafted with love, served with a smile.</p>
                </div>

                <div className="bg-brand-light p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto">
                    <AnimatePresence mode="wait">
                        <FormContent />
                    </AnimatePresence>
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-orange-200"></div>
                        <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                        <div className="flex-grow border-t border-orange-200"></div>
                    </div>
                    <button onClick={continueAsGuest} className="w-full bg-brand-green text-white font-bold py-3 rounded-lg hover:bg-emerald-500 transition-colors duration-300 transform hover:scale-105">
                        Continue as a Guest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;