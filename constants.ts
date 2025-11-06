
import { MenuItem, DietaryTag, Badge, PromoCode } from './types';

export const MENU_CATEGORIES = ['Loaded Fries', 'Sides', 'Dips', 'Drinks'];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
    {
        id: 'lf-01',
        name: 'Classic Cheesy Fries',
        description: 'Crispy golden fries smothered in our signature three-cheese sauce and topped with fresh chives.',
        price: 8.99,
        category: 'Loaded Fries',
        imageUrl: 'https://picsum.photos/seed/cheesyfries/600/400',
        rating: 4.5,
        dietaryTags: [DietaryTag.Vegetarian],
        isSpicy: false,
        isAvailable: true,
        customizations: [{ name: 'Add Bacon Bits', price: 1.50 }, { name: 'Extra Cheese', price: 2.00 }, { name: 'Add Jalapeños', price: 0.75 }],
        reviews: [{ author: 'FryFanatic', rating: 5, comment: 'The best cheesy fries in town!' }],
        nutrition: { calories: 650, protein: 15, carbs: 70, fat: 35 }
    },
    {
        id: 'lf-02',
        name: 'Spicy Volcano Fries',
        description: 'A fiery eruption of flavor! Fries topped with spicy chili, jalapeños, pepper jack cheese, and a drizzle of sriracha aioli.',
        price: 10.99,
        category: 'Loaded Fries',
        imageUrl: 'https://picsum.photos/seed/volcanofries/600/400',
        rating: 4.8,
        dietaryTags: [],
        isSpicy: true,
        isAvailable: true,
        customizations: [{ name: 'Extra Chili', price: 2.50 }, { name: 'Sour Cream', price: 1.00 }],
        reviews: [{ author: 'HeatSeeker', rating: 5, comment: 'Perfectly spicy and delicious!' }],
        nutrition: { calories: 800, protein: 25, carbs: 75, fat: 45 }
    },
    {
        id: 'lf-03',
        name: 'Vegan Garden Delight',
        description: 'A healthy and hearty option. Sweet potato fries topped with black beans, corn salsa, avocado, and a cilantro-lime vegan crema.',
        price: 11.99,
        category: 'Loaded Fries',
        imageUrl: 'https://picsum.photos/seed/veganfries/600/400',
        rating: 4.7,
        dietaryTags: [DietaryTag.Vegan, DietaryTag.GlutenFree, DietaryTag.Vegetarian],
        isSpicy: false,
        isAvailable: true,
        customizations: [{ name: 'Add Vegan Chorizo', price: 3.00 }, { name: 'Extra Avocado', price: 2.00 }],
        reviews: [{ author: 'PlantPower', rating: 5, comment: 'So fresh and flavorful!' }],
        nutrition: { calories: 550, protein: 12, carbs: 80, fat: 20 }
    },
    {
        id: 'sd-01',
        name: 'Crispy Onion Rings',
        description: 'Golden, beer-battered onion rings served with your choice of dip.',
        price: 5.99,
        category: 'Sides',
        imageUrl: 'https://picsum.photos/seed/onionrings/600/400',
        rating: 4.3,
        dietaryTags: [DietaryTag.Vegetarian],
        isSpicy: false,
        isAvailable: true,
        customizations: [],
        reviews: [],
        nutrition: { calories: 400, protein: 5, carbs: 50, fat: 20 }
    },
    {
        id: 'dr-01',
        name: 'Fresh Lemonade',
        description: 'House-made lemonade, perfectly sweet and tart.',
        price: 3.50,
        category: 'Drinks',
        imageUrl: 'https://picsum.photos/seed/lemonade/600/400',
        rating: 4.9,
        dietaryTags: [DietaryTag.Vegan, DietaryTag.GlutenFree, DietaryTag.Vegetarian],
        isSpicy: false,
        isAvailable: true,
        customizations: [{ name: 'Add Strawberry Puree', price: 0.50 }, { name: 'Add Mint', price: 0.50 }],
        reviews: [],
        nutrition: { calories: 150, protein: 0, carbs: 40, fat: 0 }
    }
];

export const INITIAL_BADGES: Badge[] = [
    { id: 'b-01', name: 'First Fry', description: 'Placed your first order!', icon: '🍟', unlocks: null },
    { id: 'b-02', name: 'Loaded Legend', description: 'Tried all loaded fry varieties.', icon: '🏆', unlocks: 'Crown' },
    { id: 'b-03', name: 'Spud Saver', description: 'Used Spud Points for a discount.', icon: '💰', unlocks: null },
    { id: 'b-04', name: 'Night Owl', description: 'Ordered after 10 PM.', icon: '🦉', unlocks: 'Top Hat' },
];

export const INITIAL_PROMO_CODES: PromoCode[] = [
    { code: 'SAVE10', discountPercentage: 10, isActive: true },
    { code: 'POTATO20', discountPercentage: 20, isActive: true },
];

export const POTATO_AVATAR_ACCESSORIES: Record<string, string> = {
    'Crown': '👑',
    'Top Hat': '🎩',
    'Chef Hat': '👨‍🍳',
    'Sunglasses': '😎'
};
   