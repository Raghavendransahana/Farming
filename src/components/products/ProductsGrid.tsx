"use client";

import { useState, useEffect } from 'react';
import { SimpleGrid, Title } from '@mantine/core';
import { useProduct } from '@/contexts/ProductContext';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeletons';
import { LazyLoad } from '@/components/ui/LazyLoad';

export function ProductsGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const { products } = useProduct();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 poppins">
      <Title 
        order={2} 
        size="2rem" 
        fw={700} 
        ta="center" 
        mb="xl"
        c="dark"
      >
        Animals at our form
        
      </Title>
      
      <SimpleGrid 
        cols={{ base: 1, sm: 2, lg: 3 }} 
        spacing="lg"
      >
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            {products.map((animal, index) => (
              <LazyLoad key={animal.id}>
                <ProductCard animal={animal} index={index} />
              </LazyLoad>
            ))}
          </>
        )}
      </SimpleGrid>
    </div>
  );
}
