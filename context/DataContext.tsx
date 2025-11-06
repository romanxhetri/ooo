import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { MenuItem, User, PromoCode, Badge, Reservation, GalleryImage, TeamMember } from '../types';
import { INITIAL_MENU_ITEMS, INITIAL_PROMO_CODES, INITIAL_BADGES, INITIAL_GALLERY_IMAGES, INITIAL_TEAM_MEMBERS, INITIAL_RESERVATIONS } from '../constants';

interface DataContextType {
    menuItems: MenuItem[];
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
    promoCodes: PromoCode[];
    setPromoCodes: React.Dispatch<React.SetStateAction<PromoCode[]>>;
    dailySpecialId: string | null;
    setDailySpecialId: React.Dispatch<React.SetStateAction<string | null>>;
    badges: Badge[];
    reservations: Reservation[];
    setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
    galleryImages: GalleryImage[];
    teamMembers: TeamMember[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [menuItems, setMenuItems] = useLocalStorage<MenuItem[]>('menuItems', []);
    const [users, setUsers] = useLocalStorage<User[]>('users', []);
    const [promoCodes, setPromoCodes] = useLocalStorage<PromoCode[]>('promoCodes', []);
    const [dailySpecialId, setDailySpecialId] = useLocalStorage<string | null>('dailySpecialId', null);
    const [badges] = useLocalStorage<Badge[]>('badges', INITIAL_BADGES);
    const [reservations, setReservations] = useLocalStorage<Reservation[]>('reservations', INITIAL_RESERVATIONS);
    const [galleryImages] = useLocalStorage<GalleryImage[]>('galleryImages', INITIAL_GALLERY_IMAGES);
    const [teamMembers] = useLocalStorage<TeamMember[]>('teamMembers', INITIAL_TEAM_MEMBERS);

    useEffect(() => {
        const storedMenu = localStorage.getItem('menuItems');
        if (!storedMenu || JSON.parse(storedMenu).length === 0) {
            setMenuItems(INITIAL_MENU_ITEMS);
        }

        const storedPromos = localStorage.getItem('promoCodes');
        if (!storedPromos || JSON.parse(storedPromos).length === 0) {
            setPromoCodes(INITIAL_PROMO_CODES);
        }

        const storedSpecial = localStorage.getItem('dailySpecialId');
        if (!storedSpecial) {
            setDailySpecialId('lf-02'); // Set a default special
        }
        
        const storedUsers = localStorage.getItem('users');
        if (!storedUsers || JSON.parse(storedUsers).length === 0) {
            setUsers([
                {
                    id: 'admin-user',
                    name: 'Admin',
                    email: 'admin@potato.com',
                    password: 'admin', // In a real app, this would be hashed
                    spudPoints: 1000,
                    unlockedBadges: [],
                    unlockedAccessories: [],
                    avatar: { base: 'classic', accessories: [] }
                }
            ]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value = {
        menuItems,
        setMenuItems,
        users,
        setUsers,
        promoCodes,
        setPromoCodes,
        dailySpecialId,
        setDailySpecialId,
        badges,
        reservations,
        setReservations,
        galleryImages,
        teamMembers,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = (): DataContextType => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
