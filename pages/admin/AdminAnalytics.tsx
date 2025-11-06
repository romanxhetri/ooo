
import React, { useMemo } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useData } from '../../context/DataContext';

const AdminAnalytics: React.FC = () => {
    const { orders } = useOrders();
    const { users, menuItems } = useData();
    
    const totalRevenue = useMemo(() => orders.reduce((sum, order) => sum + order.total, 0), [orders]);
    const totalOrders = orders.length;
    const registeredUsers = users.filter(u => u.id !== 'guest' && u.email !== 'admin@potato.com').length;
    
    const topSellingItems = useMemo(() => {
        const itemCounts: { [key: string]: { name: string, count: number, revenue: number } } = {};
        orders.forEach(order => {
            order.items.forEach(cartItem => {
                const id = cartItem.menuItem.id;
                if (!itemCounts[id]) {
                    itemCounts[id] = { name: cartItem.menuItem.name, count: 0, revenue: 0 };
                }
                itemCounts[id].count += cartItem.quantity;
                const customPrice = cartItem.customizations.reduce((acc, c) => c.selected ? acc + c.price : acc, 0);
                itemCounts[id].revenue += (cartItem.menuItem.price + customPrice) * cartItem.quantity;
            });
        });
        return Object.values(itemCounts).sort((a, b) => b.count - a.count).slice(0, 5);
    }, [orders]);

    const StatCard: React.FC<{ title: string, value: string, icon: string }> = ({ title, value, icon }) => (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
                <div className="text-3xl bg-orange-100 text-brand-orange p-3 rounded-full">{icon}</div>
                <div className="ml-4">
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon="💰" />
                <StatCard title="Total Orders" value={totalOrders.toString()} icon="📋" />
                <StatCard title="Registered Users" value={registeredUsers.toString()} icon="👥" />
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Top Selling Items</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b">
                                <th className="p-3">Item Name</th>
                                <th className="p-3">Units Sold</th>
                                <th className="p-3">Total Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topSellingItems.map(item => (
                                <tr key={item.name} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium">{item.name}</td>
                                    <td className="p-3">{item.count}</td>
                                    <td className="p-3">${item.revenue.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
    