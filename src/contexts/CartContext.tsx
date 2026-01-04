"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Animal } from '@/lib/productsData';

export interface CartItem extends Animal {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface CheckoutData {
  items: CartItem[];
  type: 'single' | 'cart';
}

interface CartContextType {
  cart: string[];
  cartItems: CartItem[];
  checkoutData: CheckoutData | null;
  toggleCart: (id: string) => void;
  addToCart: (item: Animal) => void;
  isCart: (id: string) => boolean;
  getCartItems: () => CartItem[];
  buyNow: (item: Animal) => void;
  buyAllInCart: () => void;
  clearCart: () => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    const storedItems = localStorage.getItem('cartItems');
    if (stored) setCart(JSON.parse(stored));
    if (storedItems) setCartItems(JSON.parse(storedItems));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cart, cartItems, isLoaded]);

  const toggleCart = (id: string) => {
    setCart(prev => 
      prev.includes(id) 
        ? prev.filter(cartId => cartId !== id)
        : [...prev, id]
    );
  };

  const addToCart = (item: Animal) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      // If item exists, increase quantity
      updateQuantity(item.id, existingItem.quantity + 1);
    } else {
      // Add new item
      const newCartItem: CartItem = { ...item, quantity: 1 };
      setCart(prev => [...prev, item.id]);
      setCartItems(prev => [...prev, newCartItem]);
    }
  };

  const isCart = (id: string) => cart.includes(id);

  const getCartItems = () => cartItems;

  const buyNow = (item: Animal) => {
    const cartItem: CartItem = { ...item, quantity: 1 };
    setCheckoutData({ items: [cartItem], type: 'single' });
  };

  const buyAllInCart = () => {
    setCheckoutData({ items: cartItems, type: 'cart' });
  };

  const clearCart = () => {
    setCart([]);
    setCartItems([]);
    setCheckoutData(null);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(cartId => cartId !== id));
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartItems,
      checkoutData,
      toggleCart,
      addToCart,
      isCart, 
      getCartItems,
      buyNow,
      buyAllInCart,
      clearCart,
      removeFromCart,
      updateQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
