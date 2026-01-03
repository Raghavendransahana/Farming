"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Stack, Grid, Paper, Text, Loader } from '@mantine/core';
import { useCart, CartItem } from '@/contexts/CartContext';
import { useAuth, UserDetails } from '@/contexts/AuthContext';
import { useOrder } from '@/contexts/OrderContext';
import { PaymentMethodSelector } from '@/components/payment/PaymentMethodSelector';
import { DeliveryOption } from '@/components/payment/DeliveryOption';
import { CheckoutSummary } from '@/components/payment/CheckoutSummary';
import { AddressForm } from '@/components/payment/AddressForm';

const DELIVERY_CHARGE = 50;
const COD_CHARGE = 100;
const TAX_RATE = 0.09; // 9% tax


function CheckoutContent({
  checkoutData,
  hasExistingDetails,
  userDetails,
  address,
  handleAddressChange,
  needDelivery,
  setNeedDelivery,
  paymentMethod,
  setPaymentMethod,
  cardData,
  upiId,
  handleCardChange,
  setUpiId,
  subtotal,
  deliveryCharge,
  codCharge,
  tax,
  total,
  handleCompletePayment,
  isProcessing,
}: {
  checkoutData: any;
  hasExistingDetails: boolean;
  userDetails: UserDetails | null;
  address: UserDetails;
  handleAddressChange: (field: keyof UserDetails, value: string) => void;
  needDelivery: boolean;
  setNeedDelivery: (value: boolean) => void;
  paymentMethod: 'card' | 'upi' | 'cod';
  setPaymentMethod: (value: 'card' | 'upi' | 'cod') => void;
  cardData: any;
  upiId: string;
  handleCardChange: (field: string, value: string) => void;
  setUpiId: (value: string) => void;
  subtotal: number;
  deliveryCharge: number;
  codCharge: number;
  tax: number;
  total: number;
  handleCompletePayment: () => void;
  isProcessing: boolean;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Text size="xl" fw={700} mb="xl" c="#2B8A3E">
          Complete Your Purchase
        </Text>

        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap="lg">
              <Paper shadow="sm" p="lg" radius="md" style={{ border: '1px solid #e9ecef' }}>
                {hasExistingDetails ? (
                  <Stack gap="md">
                    <Text size="lg" fw={600} c="#2B8A3E">
                      Delivery Address
                    </Text>
                    <Stack gap={4}>
                      <Text fw={500}>{userDetails?.name}</Text>
                      <Text size="sm" c="dimmed">{userDetails?.address}</Text>
                      <Text size="sm" c="dimmed">{userDetails?.location}</Text>
                    </Stack>
                  </Stack>
                ) : (
                  <AddressForm address={address} onChange={handleAddressChange} />
                )}
              </Paper>

              <Paper shadow="sm" p="lg" radius="md" style={{ border: '1px solid #e9ecef' }}>
                <DeliveryOption
                  needDelivery={needDelivery}
                  onChange={setNeedDelivery}
                  deliveryCharge={DELIVERY_CHARGE}
                />
              </Paper>

              <Paper shadow="sm" p="lg" radius="md" style={{ border: '1px solid #e9ecef' }}>
                <PaymentMethodSelector
                  selected={paymentMethod}
                  onChange={setPaymentMethod}
                  cardData={cardData}
                  upiId={upiId}
                  onCardChange={handleCardChange}
                  onUpiChange={setUpiId}
                />
              </Paper>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 5 }}>
            <CheckoutSummary
              items={checkoutData.items}
              subtotal={subtotal}
              deliveryCharge={deliveryCharge}
              codCharge={codCharge}
              tax={tax}
              total={total}
            />

            <Button
              fullWidth
              size="lg"
              mt="lg"
              onClick={handleCompletePayment}
              loading={isProcessing}
              styles={{
                root: {
                  backgroundColor: '#2B8A3E',
                  '&:hover': { backgroundColor: '#236d32' },
                }
              }}
            >
              Complete Payment | ₹{total.toLocaleString()}
            </Button>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
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

  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [upiId, setUpiId] = useState('');

  const hasExistingDetails = !!(userDetails?.name && userDetails?.address && userDetails?.location);

  useEffect(() => {
    if (!checkoutData || checkoutData.items.length === 0) {
      router.push('/cart');
    }
  }, [checkoutData, router]);

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
    !checkoutData || checkoutData.items.length === 0 ? (
      <div className="min-h-screen flex items-center justify-center">
        <Loader color="#2B8A3E" />
      </div>
    ) : (
      <CheckoutContent
        checkoutData={checkoutData}
        hasExistingDetails={hasExistingDetails}
        userDetails={userDetails}
        address={address}
        handleAddressChange={handleAddressChange}
        needDelivery={needDelivery}
        setNeedDelivery={setNeedDelivery}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        cardData={cardData}
        upiId={upiId}
        handleCardChange={handleCardChange}
        setUpiId={setUpiId}
        subtotal={subtotal}
        deliveryCharge={deliveryCharge}
        codCharge={codCharge}
        tax={tax}
        total={total}
        handleCompletePayment={handleCompletePayment}
        isProcessing={isProcessing}
      />
    )
  );
}
