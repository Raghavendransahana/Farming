"use client";

import { Button } from '@mantine/core';
import { useCheckout } from '@/contexts/CheckoutContext';

export function CompletePaymentButton() {
  const { total, handleCompletePayment, isProcessing } = useCheckout();

  return (
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
  );
}
