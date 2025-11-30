export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: 'bowl' | 'drink' | 'side';
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
    isVegetarian?: boolean;
    isVegan?: boolean;
    isGlutenFree?: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'delivered' | 'cancelled';
    createdAt: string;
}
