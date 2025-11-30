'use client';

import Image from 'next/image';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

export default function AboutPage() {
    const [category, setCategory] = useState<Product['category'] | 'all'>('all');
    const { addItem } = useCart();

    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: api.products.list,
    });

    const filteredProducts = category === 'all'
        ? products
        : products?.filter(p => p.category === category);

    const categories = [
        { id: 'all', label: 'All' },
        { id: 'bowl', label: 'Bowls' },
        { id: 'side', label: 'Sides' },
        { id: 'drink', label: 'Drinks' },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="text-muted-foreground">We are a team of passionate chefs and food enthusiasts who are dedicated to bringing you the best dining experience possible.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((cat) => (
                    <Button
                        key={cat.id}
                        variant={category === cat.id ? 'default' : 'outline'}
                        onClick={() => setCategory(cat.id as Product['category'] | 'all')}
                        className="rounded-full"
                    >
                        {cat.label}
                    </Button>
                ))}
            </div>

            {/* Product Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-96 rounded-lg bg-muted animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredProducts?.map((product) => (
                        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                                {(product.isVegan || product.isVegetarian || product.isGlutenFree) && (
                                    <div className="absolute top-2 right-2 flex gap-1">
                                        {product.isVegan && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Vegan</span>}
                                        {!product.isVegan && product.isVegetarian && <span className="bg-green-400 text-white text-xs px-2 py-1 rounded-full">Veg</span>}
                                        {product.isGlutenFree && <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full">GF</span>}
                                    </div>
                                )}
                            </div>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-start text-lg">
                                    <span>{product.name}</span>
                                    <span className="text-primary">${product.price}</span>
                                </CardTitle>
                                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="flex gap-4 text-sm text-muted-foreground">
                                    {product.calories && <span>{product.calories} cal</span>}
                                    {product.protein && <span>{product.protein}g protein</span>}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => addItem(product)}>Add to Cart</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
