import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { Order, OrderStatus } from '../../types';
import { useData } from '../../context/DataContext';

const AdminOrders: React.FC = () => {
    const { orders, updateOrderStatus } = useOrders();
    const { users } = useData();
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const getUserName = (userId: string) => {
        if (userId === 'guest') return 'Guest';
        return users.find(u => u.id === userId)?.name || 'Unknown User';
    };

    const handleStatusChange = (orderId: string, status: OrderStatus) => {
        updateOrderStatus(orderId, status);
    };
    
    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Orders Dashboard</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                <th className="p-3">Order ID</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Customer</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedOrders.map(order => (
                                <React.Fragment key={order.id}>
                                    <tr className="border-b hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}>
                                        <td className="p-3 font-mono text-sm">...{order.id.slice(-6)}</td>
                                        <td className="p-3 text-sm">{new Date(order.createdAt).toLocaleString()}</td>
                                        <td className="p-3">{getUserName(order.userId)}</td>
                                        <td className="p-3 font-semibold">${order.total.toFixed(2)}</td>
                                        <td className="p-3">{order.type}</td>
                                        <td className="p-3">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                                onClick={(e) => e.stopPropagation()} // Prevent row click from firing
                                                className="p-1 border rounded text-sm"
                                            >
                                                {Object.values(OrderStatus).map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-3 text-sm text-blue-600">{expandedOrderId === order.id ? 'Hide Details' : 'View Details'}</td>
                                    </tr>
                                    {expandedOrderId === order.id && (
                                        <tr className="bg-orange-50">
                                            <td colSpan={7} className="p-4">
                                                <h4 className="font-bold text-md mb-2">Order Details:</h4>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p><strong>Delivery Address:</strong> {order.deliveryAddress || 'N/A for Pickup'}</p>
                                                        <p><strong>Scheduled At:</strong> {order.scheduledAt ? new Date(order.scheduledAt).toLocaleString() : 'ASAP'}</p>
                                                        <p><strong>Promo Code Used:</strong> {order.promoCode || 'None'}</p>
                                                        <p><strong>Points Used:</strong> {order.pointsUsed}</p>
                                                    </div>
                                                    <div>
                                                        <strong>Items:</strong>
                                                        <ul className="list-disc pl-5">
                                                            {order.items.map((item, index) => (
                                                                <li key={index}>
                                                                    {item.quantity}x {item.menuItem.name}
                                                                    {item.customizations.filter(c => c.selected).length > 0 && 
                                                                        <span className="text-xs text-gray-500"> ({item.customizations.filter(c => c.selected).map(c => c.name).join(', ')})</span>
                                                                    }
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
