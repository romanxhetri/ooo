
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { MenuItem, DietaryTag, Customization, Review, NutritionInfo } from '../../types';

const EMPTY_MENU_ITEM: MenuItem = {
    id: '', name: '', description: '', price: 0, category: '', imageUrl: 'https://picsum.photos/600/400', rating: 0,
    dietaryTags: [], isSpicy: false, isAvailable: true,
    customizations: [], reviews: [],
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
};

const AdminMenu: React.FC = () => {
    const { menuItems, setMenuItems } = useData();
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleEdit = (item: MenuItem) => {
        setEditingItem({ ...item });
        setIsCreating(false);
    };

    const handleCreateNew = () => {
        setEditingItem({ ...EMPTY_MENU_ITEM, id: `item-${Date.now()}` });
        setIsCreating(true);
    };

    const handleSave = () => {
        if (!editingItem) return;
        if (isCreating) {
            setMenuItems(prev => [...prev, editingItem]);
        } else {
            setMenuItems(prev => prev.map(item => item.id === editingItem.id ? editingItem : item));
        }
        setEditingItem(null);
        setIsCreating(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setMenuItems(prev => prev.filter(item => item.id !== id));
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!editingItem) return;
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
             const { checked } = e.target as HTMLInputElement;
             setEditingItem({ ...editingItem, [name]: checked });
        } else {
            setEditingItem({ ...editingItem, [name]: type === 'number' ? parseFloat(value) : value });
        }
    };

    if (editingItem) {
        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">{isCreating ? 'Create New Item' : 'Edit Menu Item'}</h2>
                <div className="bg-white p-6 rounded-lg shadow grid grid-cols-2 gap-4">
                    <input name="name" value={editingItem.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded col-span-2" />
                    <textarea name="description" value={editingItem.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded col-span-2" />
                    <input name="price" type="number" value={editingItem.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded" />
                    <input name="category" value={editingItem.category} onChange={handleChange} placeholder="Category" className="p-2 border rounded" />
                    <input name="imageUrl" value={editingItem.imageUrl} onChange={handleChange} placeholder="Image URL" className="p-2 border rounded col-span-2" />
                    <div className="flex items-center gap-4">
                        <label><input type="checkbox" name="isAvailable" checked={editingItem.isAvailable} onChange={handleChange} /> Available</label>
                        <label><input type="checkbox" name="isSpicy" checked={editingItem.isSpicy} onChange={handleChange} /> Spicy</label>
                    </div>
                </div>
                <div className="mt-4">
                    <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
                    <button onClick={() => setEditingItem(null)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Menu Management</h1>
                <button onClick={handleCreateNew} className="bg-blue-500 text-white px-4 py-2 rounded">Add New Item</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <table className="w-full">
                    <thead><tr className="border-b">
                        <th className="p-2 text-left">Name</th><th className="p-2 text-left">Category</th>
                        <th className="p-2 text-left">Price</th><th className="p-2 text-left">Available</th><th>Actions</th></tr></thead>
                    <tbody>
                        {menuItems.map(item => (
                            <tr key={item.id} className="border-b hover:bg-gray-50">
                                <td className="p-2">{item.name}</td><td className="p-2">{item.category}</td>
                                <td className="p-2">${item.price.toFixed(2)}</td>
                                <td className="p-2">{item.isAvailable ? 'Yes' : 'No'}</td>
                                <td className="p-2">
                                    <button onClick={() => handleEdit(item)} className="text-blue-500 mr-2">Edit</button>
                                    <button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminMenu;
    