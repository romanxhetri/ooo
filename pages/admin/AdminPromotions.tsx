
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { PromoCode } from '../../types';

const AdminPromotions: React.FC = () => {
    const { promoCodes, setPromoCodes } = useData();
    const [newCode, setNewCode] = useState('');
    const [newDiscount, setNewDiscount] = useState(10);

    const handleAddPromo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCode || newDiscount <= 0) return;
        const promo: PromoCode = {
            code: newCode.toUpperCase(),
            discountPercentage: newDiscount,
            isActive: true
        };
        setPromoCodes(prev => [...prev, promo]);
        setNewCode('');
        setNewDiscount(10);
    };

    const togglePromoStatus = (code: string) => {
        setPromoCodes(prev => prev.map(p => p.code === code ? { ...p, isActive: !p.isActive } : p));
    };
    
    const deletePromo = (code: string) => {
        setPromoCodes(prev => prev.filter(p => p.code !== code));
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Promotions Management</h1>
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h2 className="text-xl font-bold mb-4">Create New Promo Code</h2>
                <form onSubmit={handleAddPromo} className="flex items-end gap-4">
                    <div>
                        <label className="block text-sm font-medium">Promo Code</label>
                        <input type="text" value={newCode} onChange={e => setNewCode(e.target.value)} className="p-2 border rounded" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Discount (%)</label>
                        <input type="number" value={newDiscount} onChange={e => setNewDiscount(parseInt(e.target.value))} className="p-2 border rounded w-24" required />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Promo</button>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Existing Promo Codes</h2>
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left">Code</th>
                            <th className="p-2 text-left">Discount</th>
                            <th className="p-2 text-left">Status</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promoCodes.map(promo => (
                            <tr key={promo.code} className="border-b hover:bg-gray-50">
                                <td className="p-2 font-mono">{promo.code}</td>
                                <td className="p-2">{promo.discountPercentage}%</td>
                                <td className="p-2">
                                    <span className={`px-2 py-1 text-xs rounded-full ${promo.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {promo.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-2">
                                    <button onClick={() => togglePromoStatus(promo.code)} className="text-blue-500 mr-2">{promo.isActive ? 'Deactivate' : 'Activate'}</button>
                                    <button onClick={() => deletePromo(promo.code)} className="text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPromotions;
    