import { Product, Order } from '@/types';

// Mock data for initial development
const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Green Goddess Bowl',
        description: 'Quinoa, kale, avocado, roasted chickpeas, and tahini dressing.',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
        category: 'bowl',
        calories: 450,
        protein: 15,
        isVegan: true,
        isGlutenFree: true,
    },
    {
        id: '2',
        name: 'Salmon Poke Bowl',
        description: 'Fresh salmon, sushi rice, edamame, cucumber, and spicy mayo.',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        category: 'bowl',
        calories: 550,
        protein: 25,
        isGlutenFree: true,
    },
    {
        id: '3',
        name: 'Mediterranean Bowl',
        description: 'Falafel, hummus, tabbouleh, olives, and feta cheese.',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
        category: 'bowl',
        calories: 500,
        protein: 12,
        isVegetarian: true,
    },
    {
        id: '4',
        name: 'Berry Smoothie',
        description: 'Mixed berries, banana, almond milk, and chia seeds.',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?auto=format&fit=crop&w=800&q=80',
        category: 'drink',
        calories: 250,
        isVegan: true,
    }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    products: {
        list: async (): Promise<Product[]> => {
            await delay(500);
            return MOCK_PRODUCTS;
        },
        get: async (id: string): Promise<Product | undefined> => {
            await delay(300);
            return MOCK_PRODUCTS.find(p => p.id === id);
        },
    },
    orders: {
        create: async (order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<Order> => {
            await delay(1000);
            return {
                ...order,
                id: Math.random().toString(36).substr(2, 9),
                status: 'pending',
                createdAt: new Date().toISOString(),
            };
        },
        list: async (): Promise<Order[]> => {
            await delay(500);
            return [];
        },
    },
};
