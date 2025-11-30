'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export function Header() {
    const { data: session } = useSession();
    const { totalItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-20 items-center justify-between px-4">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-primary italic" style={{ fontFamily: 'serif' }}>Foodezza</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="transition-colors hover:text-primary text-primary">Home</Link>
                    <Link href="/about" className="transition-colors hover:text-primary">About</Link>
                    <Link href="/menu" className="transition-colors hover:text-primary">Menu</Link>
                    <Link href="/orders" className="transition-colors hover:text-primary">Orders</Link>
                    <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <Link href="/cart">
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingBag className="h-5 w-5" />
                            <span className="sr-only">Cart</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Button>
                    </Link>

                    {session ? (
                        <div className="hidden md:flex items-center space-x-4">
                            <span className="text-sm font-medium">{session.user?.name}</span>
                            <Button variant="outline" size="sm" onClick={() => signOut()} className="rounded-full px-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <Button variant="outline" size="sm" onClick={() => signIn('google')} className="hidden md:flex rounded-full px-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                            Sign In
                        </Button>
                    )}

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t p-4 space-y-4 bg-background">
                    <nav className="flex flex-col space-y-4">
                        <Link href="/menu" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Menu</Link>
                        <Link href="/about" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>About</Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact</Link>
                    </nav>
                    <div className="pt-4 border-t">
                        {session ? (
                            <div className="flex flex-col space-y-2">
                                <span className="text-sm font-medium">{session.user?.name}</span>
                                <Button variant="outline" size="sm" onClick={() => signOut()} className="w-full">
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <Button variant="default" size="sm" onClick={() => signIn('google')} className="w-full">
                                Sign In
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
