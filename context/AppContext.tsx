
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Page, MenuItem, Order } from '../types';

interface AppStateContextType {
    currentPage: Page;
    navigateTo: (page: Page) => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    isMenuItemModalOpen: boolean;
    openMenuItemModal: (item: MenuItem) => void;
    closeMenuItemModal: () => void;
    selectedMenuItem: MenuItem | null;
    isOrderConfirmationOpen: boolean;
    openOrderConfirmation: (order: Order) => void;
    closeOrderConfirmation: () => void;
    confirmedOrder: Order | null;
    activeAiModal: 'chef' | 'assistant' | 'voice' | null;
    setActiveAiModal: (modal: 'chef' | 'assistant' | 'voice' | null) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.Menu);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuItemModalOpen, setIsMenuItemModalOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
    const [isOrderConfirmationOpen, setIsOrderConfirmationOpen] = useState(false);
    const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
    const [activeAiModal, setActiveAiModal] = useState<'chef' | 'assistant' | 'voice' | null>(null);


    const navigateTo = (page: Page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const openMenuItemModal = (item: MenuItem) => {
        setSelectedMenuItem(item);
        setIsMenuItemModalOpen(true);
    };

    const closeMenuItemModal = () => {
        setIsMenuItemModalOpen(false);
        setSelectedMenuItem(null);
    };
    
    const openOrderConfirmation = (order: Order) => {
        setConfirmedOrder(order);
        setIsOrderConfirmationOpen(true);
    };
    
    const closeOrderConfirmation = () => {
        setIsOrderConfirmationOpen(false);
        setConfirmedOrder(null);
    };

    const value = {
        currentPage,
        navigateTo,
        isCartOpen,
        setIsCartOpen,
        isMenuItemModalOpen,
        openMenuItemModal,
        closeMenuItemModal,
        selectedMenuItem,
        isOrderConfirmationOpen,
        openOrderConfirmation,
        closeOrderConfirmation,
        confirmedOrder,
        activeAiModal,
        setActiveAiModal,
    };

    return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = (): AppStateContextType => {
    const context = useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within an AppStateProvider');
    }
    return context;
};
   