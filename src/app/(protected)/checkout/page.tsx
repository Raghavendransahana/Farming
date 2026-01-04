"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader, Grid } from '@mantine/core';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { CheckoutProvider, useCheckout } from '@/contexts/CheckoutContext';
import { CheckoutContent } from '@/components/checkout/CheckoutContent';
import { CheckoutSummary } from '@/components/payment/CheckoutSummary';
import { CompletePaymentButton } from '@/components/checkout/CompletePaymentButton';

function CheckoutPageContent() {
  const router = useRouter();
  const { checkoutData } = useCart();
  const { userDetails } = useAuth();
  const { subtotal, deliveryCharge, codCharge, tax, total } = useCheckout();

  useEffect(() => {
    if (!checkoutData || checkoutData.items.length === 0) {
      router.push('/cart');
    }
  }, [checkoutData, router]);

  if (!checkoutData || checkoutData.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader color="#2B8A3E" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Grid gutter="lg">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <CheckoutContent checkoutData={checkoutData} userDetails={userDetails} />
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
            <CompletePaymentButton />
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutPageContent />
    </CheckoutProvider>
  );
}
