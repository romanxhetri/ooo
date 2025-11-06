
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminPage } from '../../types';
import AdminAnalytics from './AdminAnalytics';
import AdminMenu from './AdminMenu';
import AdminUsers from './AdminUsers';
import AdminPromotions from './AdminPromotions';
import AdminSettings from './AdminSettings';
import { LogoutIcon } from '../../components/icons';

const AdminDashboard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<AdminPage>(AdminPage.Analytics);
    const { logout } = useAuth();

    const renderPage = () => {
        switch (currentPage) {
            case AdminPage.Analytics: return <AdminAnalytics />;
            case AdminPage.Menu: return <AdminMenu />;
            case AdminPage.Users: return <AdminUsers />;
            case AdminPage.Promotions: return <AdminPromotions />;
            case AdminPage.Settings: return <AdminSettings />;
            default: return <AdminAnalytics />;
        }
    };
    
    const navItems = [
        { page: AdminPage.Analytics, label: 'Analytics' },
        { page: AdminPage.Menu, label: 'Menu Mgt.' },
        { page: AdminPage.Users, label: 'User Mgt.' },
        { page: AdminPage.Promotions, label: 'Promotions' },
        { page: AdminPage.Settings, label: 'Site Settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-64 bg-brand-dark text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-gray-700">P&F Admin</div>
                <nav className="flex-grow p-4">
                    <ul>
                        {navItems.map(item => (
                             <li key={item.page}>
                                <button
                                    onClick={() => setCurrentPage(item.page)}
                                    className={`w-full text-left px-4 py-2 rounded-md my-1 transition-colors ${currentPage === item.page ? 'bg-brand-orange' : 'hover:bg-gray-700'}`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                 <div className="p-4 border-t border-gray-700">
                    <button onClick={logout} className="w-full flex items-center px-4 py-2 rounded-md hover:bg-red-800/50 text-red-300">
                        <LogoutIcon className="w-5 h-5 mr-2" />
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                {renderPage()}
            </main>
        </div>
    );
};

export default AdminDashboard;
    