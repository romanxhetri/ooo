import React from 'react';

const AdminInventory: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>
            <div className="bg-white p-8 rounded-lg shadow text-center">
                <div className="text-6xl mb-4">📦</div>
                <h2 className="text-2xl font-semibold text-brand-dark mb-2">Inventory Tracking Coming Soon!</h2>
                <p className="text-gray-600">
                    We are currently building a comprehensive system to track ingredients and manage stock levels.
                    This feature will help streamline kitchen operations and prevent item unavailability.
                </p>
            </div>
        </div>
    );
};

export default AdminInventory;
