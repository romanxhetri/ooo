export enum DietaryTag {
    Vegetarian = 'Vegetarian',
    Vegan = 'Vegan',
    GlutenFree = 'Gluten-Free',
}

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    rating: number;
    dietaryTags: DietaryTag[];
    isSpicy: boolean;
    isAvailable: boolean;
    customizations: Customization[];
    reviews: Review[];
    nutrition: NutritionInfo;
}

export interface Customization {
    name: string;
    price: number;
    selected?: boolean;
}

export interface Review {
    author: string;
    rating: number;
    comment: string;
}

export interface NutritionInfo {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
}

export interface CartItem {
    menuItem: MenuItem;
    quantity: number;
    customizations: Customization[];
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string; // emoji or component name
    unlocks: string | null; // e.g. 'Chef Hat'
}

export interface PotatoAvatar {
    base: string; // e.g. 'classic-potato'
    accessories: string[]; // e.g. ['Chef Hat', 'Crown']
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // Hashed in a real app
    avatar: PotatoAvatar;
    spudPoints: number;
    unlockedBadges: string[]; // array of badge ids
    unlockedAccessories: string[];
}

export enum OrderStatus {
    Confirmed = 'Confirmed',
    Preparing = 'Preparing',
    OutForDelivery = 'Out for Delivery',
    Delivered = 'Delivered',
    ReadyForPickup = 'Ready for Pickup',
    PickedUp = 'Picked Up',
}

export enum OrderType {
    Delivery = 'Delivery',
    Pickup = 'Pickup',
}

export interface Order {
    id: string;
    userId: string | 'guest';
    items: CartItem[];
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
    status: OrderStatus;
    type: OrderType;
    deliveryAddress?: string;
    createdAt: string; // ISO string
    scheduledAt?: string; // ISO string
    promoCode?: string;
    pointsUsed: number;
}

export interface PromoCode {
    code: string;
    discountPercentage: number;
    isActive: boolean;
}

export interface Reservation {
    id: string;
    userId: string | 'guest';
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    partySize: number;
    specialRequest?: string;
}

export interface GalleryImage {
    id: string;
    url: string;
    caption: string;
}

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
}

export enum Page {
    Home = 'HOME',
    Menu = 'MENU',
    Reservations = 'RESERVATIONS',
    Gallery = 'GALLERY',
    About = 'ABOUT',
    Contact = 'CONTACT',
    Checkout = 'CHECKOUT',
    OrderTracking = 'ORDER_TRACKING',
    Profile = 'PROFILE',
    Leaderboard = 'LEADERBOARD',
}

export enum AdminPage {
    Analytics = 'ANALYTICS',
    Menu = 'MENU',
    Users = 'USERS',
    Promotions = 'PROMOTIONS',
    Settings = 'SETTINGS',
}
