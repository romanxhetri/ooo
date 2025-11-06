
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, PotatoAvatar } from '../types';
import { useData } from './DataContext';

interface AuthContextType {
    currentUser: User | null;
    login: (email: string, pass: string) => boolean;
    signup: (name: string, email: string, pass: string) => boolean;
    logout: () => void;
    continueAsGuest: () => void;
    updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const { users, setUsers } = useData();

    useEffect(() => {
        const storedUser = sessionStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const updateUserSession = (user: User | null) => {
        setCurrentUser(user);
        if (user) {
            sessionStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            sessionStorage.removeItem('currentUser');
        }
    };

    const login = (email: string, pass: string): boolean => {
        const user = users.find(u => u.email === email && u.password === pass);
        if (user) {
            updateUserSession(user);
            return true;
        }
        return false;
    };

    const signup = (name: string, email: string, pass: string): boolean => {
        if (users.some(u => u.email === email)) {
            return false; // User already exists
        }
        const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            password: pass,
            spudPoints: 50, // Welcome bonus
            unlockedBadges: [],
            unlockedAccessories: [],
            avatar: { base: 'classic', accessories: [] }
        };
        setUsers(prevUsers => [...prevUsers, newUser]);
        updateUserSession(newUser);
        return true;
    };

    const logout = () => {
        updateUserSession(null);
    };

    const continueAsGuest = () => {
        const guestUser: User = {
            id: 'guest',
            name: 'Guest',
            email: 'guest@potato.com',
            spudPoints: 0,
            unlockedBadges: [],
            unlockedAccessories: [],
            avatar: { base: 'classic', accessories: [] }
        };
        updateUserSession(guestUser);
    };

    const updateUser = (updatedUser: User) => {
        if (updatedUser.id !== 'guest') {
            setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
        }
        updateUserSession(updatedUser);
    };


    const value = { currentUser, login, signup, logout, continueAsGuest, updateUser };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
   