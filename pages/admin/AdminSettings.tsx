
import React from 'react';
import { useData } from '../../context/DataContext';

const AdminSettings: React.FC = () => {
    const { menuItems, dailySpecialId, setDailySpecialId } = useData();

    const handleSpecialChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDailySpecialId(e.target.value);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Site Settings</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-bold mb-4">Daily Special</h2>
                <p className="text-gray-600 mb-2">Select an item to feature as the Daily Special on the menu page.</p>
                <div>
                    <label htmlFor="daily-special" className="block text-sm font-medium text-gray-700">
                        Current Special Item
                    </label>
                    <select
                        id="daily-special"
                        value={dailySpecialId || ''}
                        onChange={handleSpecialChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm rounded-md"
                    >
                        <option value="" disabled>Select an item</option>
                        {menuItems.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                {dailySpecialId && (
                    <div className="mt-4 p-4 bg-orange-50 border border-brand-orange rounded-md">
                        <p className="font-semibold">Preview:</p>
                        <p className="text-gray-700">The item <span className="font-bold">{menuItems.find(i => i.id === dailySpecialId)?.name}</span> is currently the Daily Special.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSettings;
    