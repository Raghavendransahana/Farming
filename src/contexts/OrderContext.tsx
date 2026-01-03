"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserDetails } from './AuthContext';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  codCharge: number;
  tax: number;
  total: number;
  paymentMethod: 'card' | 'upi' | 'cod';
  needDelivery: boolean;
  address: UserDetails;
  date: string;
  status: 'pending' | 'confirmed' | 'delivered';
}

interface OrderContextType {
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => string;
  getOrders: () => Order[];
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) setOrders(JSON.parse(stored));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders, isLoaded]);

  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>): string => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toISOString(),
      status: 'delivered',
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder.id;
  };

  const getOrders = () => orders;

  const getOrderById = (id: string) => orders.find(order => order.id === id);

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrders, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
