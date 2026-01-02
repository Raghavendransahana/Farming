"use client";

import { Suspense } from 'react';
import { Title, Text } from '@mantine/core';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { useFavorites } from '@/contexts/FavoritesContext';
import { animals } from '@/lib/productsData';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeletons';

function FavoritesContent() {
  const { favorites } = useFavorites();
  
  const favoriteAnimals = animals.filter(animal => favorites.includes(animal.id));

  if (favoriteAnimals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Heart size={64} className="text-gray-300 mb-4" />
        <Title order={2} size="2rem" fw={600} c="dark" mb="md">
          No Favorites Yet
        </Title>
        <Text size="lg" c="dimmed" mb="xl">
          Start adding animals to your favorites by clicking the heart icon!
        </Text>
        <Link href="/products">
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all">
            Browse Animals
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favoriteAnimals.map((animal, index) => (
        <ProductCard key={animal.id} animal={animal} index={index} />
      ))}
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={32} className="text-red-500 fill-red-500" />
            <Title order={1} size="2.5rem" fw={700} c="dark">
              My Favorites
            </Title>
          </div>
          <Text size="lg" c="dimmed">
            Animals you've saved for later
          </Text>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        }>
          <FavoritesContent />
        </Suspense>
      </div>
    </div>
  );
}
