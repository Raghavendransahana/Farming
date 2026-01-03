"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { useAuth, UserDetails } from './AuthContext';
import { useOrder } from './OrderContext';

const DELIVERY_CHARGE = 50;
const COD_CHARGE = 100;
const TAX_RATE = 0.09;

interface CardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

interface CheckoutContextType {
  paymentMethod: 'card' | 'upi' | 'cod';
  setPaymentMethod: (value: 'card' | 'upi' | 'cod') => void;
  needDelivery: boolean;
  setNeedDelivery: (value: boolean) => void;
  address: UserDetails;
  handleAddressChange: (field: keyof UserDetails, value: string) => void;
  cardData: CardData;
  handleCardChange: (field: string, value: string) => void;
  upiId: string;
  setUpiId: (value: string) => void;
  isProcessing: boolean;
  subtotal: number;
  deliveryCharge: number;
  codCharge: number;
  tax: number;
  total: number;
  handleCompletePayment: () => void;
  hasExistingDetails: boolean;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { checkoutData, clearCart } = useCart();
  const { userId, userDetails, saveUserDetails } = useAuth();
  const { createOrder } = useOrder();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [needDelivery, setNeedDelivery] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [address, setAddress] = useState<UserDetails>({
    name: userDetails?.name || '',
    address: userDetails?.address || '',
    location: userDetails?.location || '',
  });

  const [cardData, setCardData] = useState<CardData>({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [upiId, setUpiId] = useState('');

  const hasExistingDetails = !!(userDetails?.name && userDetails?.address && userDetails?.location);

  const parsePrice = (price: string): number => {
    return parseInt(price.replace(/[₹,]/g, '')) || 0;
  };

  const calculateSubtotal = () => {
    return checkoutData?.items.reduce((sum, item) => 
      sum + parsePrice(item.price) * item.quantity, 0
    ) || 0;
  };

  const subtotal = calculateSubtotal();
  const deliveryCharge = needDelivery ? DELIVERY_CHARGE : 0;
  const codCharge = paymentMethod === 'cod' ? COD_CHARGE : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + deliveryCharge + codCharge + tax;

  const handleAddressChange = (field: keyof UserDetails, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleCardChange = (field: string, value: string) => {
    setCardData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    if (!address.name || !address.address || !address.location) {
      alert('Please fill in all address fields');
      return false;
    }

    if (paymentMethod === 'card') {
      if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
        alert('Please fill in all card details');
        return false;
      }
    }

    if (paymentMethod === 'upi' && !upiId) {
      alert('Please enter your UPI ID');
      return false;
    }

    return true;
  };

  const handleCompletePayment = () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    if (!hasExistingDetails) {
      saveUserDetails(address);
    }

    const orderId = createOrder({
      userId: userId || '',
      items: checkoutData!.items,
      subtotal,
      deliveryCharge,
      codCharge,
      tax,
      total,
      paymentMethod,
      needDelivery,
      address: hasExistingDetails ? userDetails! : address,
    });

    if (checkoutData!.type === 'cart') {
      clearCart();
    }

    setTimeout(() => {
      router.push(`/success?orderId=${orderId}`);
    }, 500);
  };

  return (
    <CheckoutContext.Provider
      value={{
        paymentMethod,
        setPaymentMethod,
        needDelivery,
        setNeedDelivery,
        address,
        handleAddressChange,
        cardData,
        handleCardChange,
        upiId,
        setUpiId,
        isProcessing,
        subtotal,
        deliveryCharge,
        codCharge,
        tax,
        total,
        handleCompletePayment,
        hasExistingDetails,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}
