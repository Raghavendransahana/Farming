"use client";

import { Suspense, useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, MapPin, Phone, Mail, Package, Heart } from 'lucide-react';
import { getAnimalById } from '@/lib/productsData';
import { Text, Title, Group, Divider } from '@mantine/core';
import { useFavorites } from '@/contexts/FavoritesContext';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const animal = getAnimalById(params.id as string);
  const favorited = animal ? isFavorite(animal.id) : false;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!animal) {
    return (
       <div className="min-h screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-12 rounded-2xl shadow-lg">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package size={32} className="text-gray-400" />
          </div>
          <p className="text-xl font-semibold text-gray-900 mb-2">Animal not found</p>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist</p>
          <button
            onClick={() => router.push('/products')}
            className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          
          <div className="lg:sticky lg:top-24 lg:self-start h-[600px] lg:h-[700px]">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
             
              <button
                onClick={() => {
                  if (!animal) return;
                  if (favorited) {
                    setShowConfirm(true);
                  } else {
                    toggleFavorite(animal.id);
                  }
                }}
                className={`absolute top-4 right-4 z-20 p-3 rounded-full transition-all duration-200 ${
                  favorited 
                    ? 'bg-red-100 hover:bg-red-200' 
                    : 'bg-white/80 hover:bg-white backdrop-blur-sm'
                } shadow-lg`}
              >
                <Heart
                  size={24}
                  className={`transition-all duration-200 ${
                    favorited 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600 hover:text-red-500'
                  }`}
                />
              </button>

              {!imageError ? (
                <Image
                  src={animal.image}
                  alt={animal.name}
                  fill
                  className="object-cover"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-green-50 to-emerald-50">
                  <span className="text-9xl opacity-20">
                    {getAnimalEmoji(animal.type)}
                  </span>
                </div>
              )}
            </div>
          </div>

          
          <div className="space-y-8">
            
           
            <Title order={1} size="3rem" fw={700} className="text-gray-900">
              {animal.name}
            </Title>

            <div className="flex items-baseline gap-2">
              <Text size="2xl" fw={700} c="dark">
                {animal.price}
              </Text>
              {animal.originalPrice && (
                <Text size="xl" c="dimmed" td="line-through">
                  {animal.originalPrice}
                </Text>
              )}
            </div>

           

            <div>
              
              <Text size="md" c="dimmed" className="mt-0">
                {animal.description}
              </Text>
            </div>

           <Divider/>

            <div>
              <Title order={3} size="1.25rem" fw={600} mb="md" c="dark">
                Location
              </Title>
              <Group gap="sm">
                <MapPin size={20} className="text-green-600" />
                <Text size="md" c="dark">
                  {animal.location}, {animal.state}
                </Text>
              </Group>
            </div>

           

            <div>
              <Title order={3} size="1.25rem" fw={600} mb="md" c="dark">
                Contact Seller
              </Title>
              <div className="space-y-4">
                <div>
                  <Text size="sm" c="dimmed" mb={4}>Owner</Text>
                  <Text size="md" fw={500} c="dark">
                    {animal.ownerName}
                  </Text>
                </div>

                <div>
                  <Text size="sm" c="dimmed" mb={4}>Phone</Text>
                  <Group gap="sm">
                    <Phone size={18} className="text-green-600" />
                    <a 
                      href={`tel:${animal.ownerPhone}`}
                      className="text-green-600 hover:text-green-700 font-medium hover:underline"
                    >
                      {animal.ownerPhone}
                    </a>
                  </Group>
                </div>

                <div>
                  <Text size="sm" c="dimmed" mb={4}>Email</Text>
                  <Group gap="sm">
                    <Mail size={18} className="text-green-600" />
                    <a 
                      href={`mailto:${animal.ownerEmail}`}
                      className="text-green-600 hover:text-green-700 font-medium hover:underline"
                    >
                      {animal.ownerEmail}
                    </a>
                  </Group>
                </div>
              </div>
            </div>

            
            <button className="w-36 px-3 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg">
              Message Seller
            </button>
          </div>
        </div>
      </div>

      {animal && (
        <ConfirmModal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => toggleFavorite(animal.id)}
          title="Remove from Favorites?"
          message="Do you really want to remove this animal from your favorites?"
        />
      )}
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    }>
      <ProductDetailContent />
    </Suspense>
  );
}