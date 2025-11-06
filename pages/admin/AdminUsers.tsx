
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { User } from '../../types';

const AdminUsers: React.FC = () => {
    const { users, setUsers } = useData();
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [points, setPoints] = useState(0);

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setPoints(user.spudPoints);
    };

    const handleSave = () => {
        if (!editingUser) return;
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, spudPoints: points } : u));
        setEditingUser(null);
    };

    const nonAdminUsers = users.filter(u => u.email !== 'admin@potato.com');

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">User Management</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left">Name</th>
                            <th className="p-2 text-left">Email</th>
                            <th className="p-2 text-left">Spud Points</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nonAdminUsers.map(user => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">{user.name}</td>
                                <td className="p-2">{user.email}</td>
                                <td className="p-2">
                                    {editingUser?.id === user.id ? (
                                        <input
                                            type="number"
                                            value={points}
                                            onChange={(e) => setPoints(parseInt(e.target.value))}
                                            className="p-1 border rounded w-24"
                                        />
                                    ) : (
                                        user.spudPoints
                                    )}
                                </td>
                                <td className="p-2">
                                    {editingUser?.id === user.id ? (
                                        <>
                                            <button onClick={handleSave} className="text-green-500 mr-2">Save</button>
                                            <button onClick={() => setEditingUser(null)} className="text-gray-500">Cancel</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleEdit(user)} className="text-blue-500">Edit Points</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
    