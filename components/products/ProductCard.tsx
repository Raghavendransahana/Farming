"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Text, Group } from '@mantine/core';
import { MapPin, ArrowRight, Heart } from 'lucide-react';
import { useFavorites } from '@/contexts/FavoritesContext';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

interface Animal {
  id: string;
  name: string;
  type: string;
  price: string;
  image: string;
  location: string;
  state: string;
  description: string;
}

interface ProductCardProps {
  animal: Animal;
  index?: number;
}

export function ProductCard({ animal }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(animal.id);

  const getAnimalEmoji = (type: string) => {
    const emojiMap: Record<string, string> = {
      'Cow': '🐄',
      'Goat': '🐐',
      'Sheep': '🐑',
      'Chicken': '🐔',
      'Pig': '🐷',
      'Duck': '🦆',
    };
    return emojiMap[type] || '🐾';
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorited) {
      // Show custom modal when unliking
      setShowConfirm(true);
    } else {
      // Directly add to favorites
      toggleFavorite(animal.id);
    }
  };

  return (
    <Card
      shadow="sm"
      padding={0}
      radius="md"
      withBorder
      className="grid grid-rows-[auto_auto_1fr_auto] transition-shadow duration-200 hover:shadow-md h-full overflow-hidden relative"
    >
     
      <button
        onClick={handleFavoriteClick}
        className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-200 ${
          favorited 
            ? 'bg-red-100 hover:bg-red-200' 
            : 'bg-white/80 hover:bg-white backdrop-blur-sm'
        } shadow-md`}
      >
        <Heart
          size={20}
          className={`transition-all duration-200 ${
            favorited 
              ? 'fill-red-500 text-red-500' 
              : 'text-gray-600 hover:text-red-500'
          }`}
        />
      </button>

    
      <Card.Section className="aspect-[16/9] w-full overflow-hidden">
        <Link href={`/products/${animal.id}`}>
          <div className="relative w-full h-full bg-gray-50 transition-opacity duration-200 hover:opacity-70">
            {!imageError ? (
              <Image
                src={animal.image}
                alt={animal.name}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl opacity-30">
                  {getAnimalEmoji(animal.type)}
                </span>
              </div>
            )}
          </div>
        </Link>
      </Card.Section>

    
      <div className="p-3 pl-6 pb-0">
        <Link href={`/products/${animal.id}`} style={{ textDecoration: 'none' }}>
          <Text 
            size="xl" 
            fw={600} 
            c="dark" 
            className="hover:underline"
          >
            {animal.name}
          </Text>
        </Link>
      </div>

    
      <div className="px-6 py-0">
        <Text size="xl" fw={700} c="dark" mb="sm">
          {animal.price}
        </Text>

        <Group gap="xs" className="text-gray-500">
          <Text size="sm" c="dimmed">
            {animal.description}
          </Text>
        </Group>
      </div>

     
      <div className="px-6 pb-6 mt-3">
        <Link href={`/products/${animal.id}`} style={{ textDecoration: 'none' }}>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-100 hover:bg-green-600 active:bg-green-700 text-green-700 hover:text-white active:text-white font-medium transition-all duration-200">
            Read more
            <ArrowRight size={16} />
          </button>
        </Link>
      </div>

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => toggleFavorite(animal.id)}
        title="Remove from Favorites?"
        message="Do you really want to remove this animal from your favorites?"
      />
    </Card>
  );
}
