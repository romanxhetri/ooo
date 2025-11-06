
import React from 'react';
import { DataProvider } from './context/DataContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppStateProvider, useAppState } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import MainApp from './pages/MainApp';
import AdminDashboard from './pages/admin/AdminDashboard';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';

const App: React.FC = () => {
    return (
        <DataProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </DataProvider>
    );
};

const AppContent: React.FC = () => {
    const { currentUser } = useAuth();
    
    if (!currentUser) {
        return <LoginPage />;
    }

    return (
        <AppStateProvider>
            <CartProvider>
                <OrderProvider>
                    {currentUser.email === 'admin@potato.com' ? <AdminDashboard /> : <MainApp />}
                </OrderProvider>
            </CartProvider>
        </AppStateProvider>
    );
};

export default App;
   