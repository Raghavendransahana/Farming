"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Animal, animals as initialAnimals } from '@/lib/productsData';

interface ProductContextType {
  products: Animal[];
  addProduct: (product: Animal) => void;
  getProducts: () => Animal[];
  getProductById: (id: string) => Animal | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Animal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      
      setProducts(initialAnimals);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const addProduct = (product: Animal) => {
    setProducts(prev => [product, ...prev]);
  };

  const getProducts = () => products;

  const getProductById = (id: string) => products.find(p => p.id === id);

  return (
    <ProductContext.Provider value={{ products, addProduct, getProducts, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
