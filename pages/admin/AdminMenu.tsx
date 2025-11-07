
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { MenuItem, DietaryTag, Customization } from '../../types';
import { MENU_CATEGORIES } from '../../constants';

const EMPTY_MENU_ITEM: MenuItem = {
    id: '', name: '', description: '', price: 0, category: MENU_CATEGORIES[0], imageUrl: 'https://picsum.photos/seed/newitem/600/400', rating: 4.5,
    dietaryTags: [], isSpicy: false, isAvailable: true,
    customizations: [], reviews: [],
    nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 }
};

const AdminMenu: React.FC = () => {
    const { menuItems, setMenuItems } = useData();
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleEdit = (item: MenuItem) => {
        setEditingItem(JSON.parse(JSON.stringify(item))); // Deep copy to avoid direct state mutation
        setIsCreating(false);
    };

    const handleCreateNew = () => {
        setEditingItem({ ...EMPTY_MENU_ITEM, id: `item-${Date.now()}` });
        setIsCreating(true);
    };

    const handleSave = () => {
        if (!editingItem || !editingItem.name || !editingItem.category) {
            alert("Name and Category are required.");
            return;
        }
        if (isCreating) {
            setMenuItems(prev => [...prev, editingItem]);
        } else {
            setMenuItems(prev => prev.map(item => item.id === editingItem.id ? editingItem : item));
        }
        setEditingItem(null);
        setIsCreating(false);
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
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
    
    const handleDietaryTagChange = (tag: DietaryTag) => {
        if (!editingItem) return;
        const newTags = editingItem.dietaryTags.includes(tag)
            ? editingItem.dietaryTags.filter(t => t !== tag)
            : [...editingItem.dietaryTags, tag];
        setEditingItem({ ...editingItem, dietaryTags: newTags });
    };

    const handleNutritionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editingItem) return;
        const { name, value } = e.target;
        setEditingItem({
            ...editingItem,
            nutrition: { ...editingItem.nutrition, [name]: parseFloat(value) || 0 }
        });
    };

    const handleCustomizationChange = (index: number, field: keyof Customization, value: string | number) => {
        if (!editingItem) return;
        const newCustomizations = [...editingItem.customizations];
        (newCustomizations[index] as any)[field] = value;
        setEditingItem({ ...editingItem, customizations: newCustomizations });
    };

    const addCustomization = () => {
        if (!editingItem) return;
        setEditingItem({ ...editingItem, customizations: [...editingItem.customizations, { name: '', price: 0 }] });
    };

    const removeCustomization = (index: number) => {
        if (!editingItem) return;
        const newCustomizations = editingItem.customizations.filter((_, i) => i !== index);
        setEditingItem({ ...editingItem, customizations: newCustomizations });
    };


    if (editingItem) {
        return (
            <div>
                <h2 className="text-2xl font-bold mb-4">{isCreating ? 'Create New Menu Item' : `Editing: ${editingItem.name}`}</h2>
                <div className="bg-white p-6 rounded-lg shadow space-y-6">
                    {/* Main Details */}
                    <fieldset className="border p-4 rounded-md">
                        <legend className="font-semibold px-2">Main Details</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="name" value={editingItem.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded md:col-span-2" />
                            <textarea name="description" value={editingItem.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded md:col-span-2" rows={3} />
                            <input name="price" type="number" value={editingItem.price} onChange={handleChange} placeholder="Price" className="p-2 border rounded" />
                            <select name="category" value={editingItem.category} onChange={handleChange} className="p-2 border rounded bg-white">
                                {MENU_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                            <input name="imageUrl" value={editingItem.imageUrl} onChange={handleChange} placeholder="Image URL" className="p-2 border rounded md:col-span-2" />
                            <input name="rating" type="number" step="0.1" min="0" max="5" value={editingItem.rating} onChange={handleChange} placeholder="Rating (0-5)" className="p-2 border rounded" />
                        </div>
                    </fieldset>

                    {/* Properties */}
                    <fieldset className="border p-4 rounded-md">
                        <legend className="font-semibold px-2">Properties</legend>
                        <div className="flex flex-wrap gap-4">
                            <label><input type="checkbox" name="isAvailable" checked={editingItem.isAvailable} onChange={handleChange} className="mr-2" /> Available</label>
                            <label><input type="checkbox" name="isSpicy" checked={editingItem.isSpicy} onChange={handleChange} className="mr-2" /> Spicy</label>
                            {Object.values(DietaryTag).map(tag => (
                                <label key={tag}><input type="checkbox" checked={editingItem.dietaryTags.includes(tag)} onChange={() => handleDietaryTagChange(tag)} className="mr-2" /> {tag}</label>
                            ))}
                        </div>
                    </fieldset>

                    {/* Nutrition */}
                    <fieldset className="border p-4 rounded-md">
                        <legend className="font-semibold px-2">Nutritional Info</legend>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <input name="calories" type="number" value={editingItem.nutrition.calories} onChange={handleNutritionChange} placeholder="Calories" className="p-2 border rounded" />
                            <input name="protein" type="number" value={editingItem.nutrition.protein} onChange={handleNutritionChange} placeholder="Protein (g)" className="p-2 border rounded" />
                            <input name="carbs" type="number" value={editingItem.nutrition.carbs} onChange={handleNutritionChange} placeholder="Carbs (g)" className="p-2 border rounded" />
                            <input name="fat" type="number" value={editingItem.nutrition.fat} onChange={handleNutritionChange} placeholder="Fat (g)" className="p-2 border rounded" />
                        </div>
                    </fieldset>
                    
                    {/* Customizations */}
                    <fieldset className="border p-4 rounded-md">
                        <legend className="font-semibold px-2">Customizations</legend>
                        <div className="space-y-2">
                            {editingItem.customizations.map((cust, index) => (
                                <div key={index} className="flex gap-2 items-center">
                                    <input value={cust.name} onChange={e => handleCustomizationChange(index, 'name', e.target.value)} placeholder="Name" className="p-2 border rounded flex-grow" />
                                    <input type="number" value={cust.price} onChange={e => handleCustomizationChange(index, 'price', parseFloat(e.target.value) || 0)} placeholder="Price" className="p-2 border rounded w-24" />
                                    <button onClick={() => removeCustomization(index)} className="bg-red-500 text-white px-3 py-2 rounded">X</button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addCustomization} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded text-sm">Add Customization</button>
                    </fieldset>
                </div>
                <div className="mt-6 flex gap-2">
                    <button onClick={handleSave} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">Save</button>
                    <button onClick={() => setEditingItem(null)} className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600">Cancel</button>
                </div>
            </div>
        );
    }
    
    // Main view (list of items)
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Menu Management</h1>
                <button onClick={handleCreateNew} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add New Item</button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead><tr className="border-b bg-gray-50"><th className="p-3">Name</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Available</th><th className="p-3">Actions</th></tr></thead>
                        <tbody>
                            {menuItems.map(item => (
                                <tr key={item.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 font-medium">{item.name}</td><td className="p-3">{item.category}</td>
                                    <td className="p-3">${item.price.toFixed(2)}</td>
                                    <td className="p-3">{item.isAvailable ? '✅' : '❌'}</td>
                                    <td className="p-3 whitespace-nowrap">
                                        <button onClick={() => handleEdit(item)} className="text-blue-600 hover:underline mr-4">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;