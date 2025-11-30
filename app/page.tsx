'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Leaf, Truck, Clock, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const { addItem } = useCart();
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: api.products.list,
  });

  const featuredProducts = products?.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-10 pb-20 md:pt-20 md:pb-32">
        {/* Background Curve */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary rounded-l-[100px] hidden md:block z-0" />

        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 space-y-8 pr-0 md:pr-12">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
              Good Food For <br />
              <span className="text-primary md:text-foreground">Good Health</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
            </p>
            <div className="flex space-x-4">
              <Link href="/menu">
                <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30">
                  Order Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-full px-8 border-primary text-primary hover:bg-primary/10">
                  Sign In
                </Button>
              </Link>
            </div>

            <div className="flex space-x-8 pt-6">
              <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border">
                <div className="p-3 bg-green-100 rounded-full text-primary">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Fast Delivery</h3>
                  <p className="text-xs text-muted-foreground">Delivery within 30 minutes</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm border">
                <div className="p-3 bg-green-100 rounded-full text-primary">
                  <UtensilsCrossed className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Dine In</h3>
                  <p className="text-xs text-muted-foreground">Enjoy your food fresh crispy and hot</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 mt-12 md:mt-0 relative flex justify-center">
            <div className="relative h-[400px] w-[400px] md:h-[600px] md:w-[600px]">
              {/* Floating Elements */}
              <div className="absolute top-10 left-0 animate-bounce delay-100">
                <Leaf className="h-8 w-8 text-white/80" />
              </div>
              <div className="absolute bottom-20 right-10 animate-bounce delay-300">
                <div className="h-12 w-12 bg-red-500 rounded-full opacity-80 blur-sm" />
              </div>

              <Image
                src="/images/landingbowl.png"
                alt="Healthy Bowl"
                fill
                className="relative z-10 object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-muted/20">
              <div className="p-4 bg-primary/10 rounded-full text-primary">
                <Leaf className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Fresh Ingredients</h3>
              <p className="text-muted-foreground">Sourced locally and prepared daily for maximum freshness.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-muted/20">
              <div className="p-4 bg-secondary/10 rounded-full text-secondary">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground">Hot and fresh delivery to your doorstep in under 30 minutes.</p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-muted/20">
              <div className="p-4 bg-accent/10 rounded-full text-accent">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">Easy Ordering</h3>
              <p className="text-muted-foreground">Seamless ordering experience through our website or app.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Bowls</h2>
            <p className="text-muted-foreground">Try our customer favorites</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredProducts?.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span>{product.name}</span>
                      <span className="text-primary">${product.price}</span>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{product.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full" onClick={() => addItem(product)}>Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/menu">
              <Button variant="outline" size="lg">View Full Menu</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
