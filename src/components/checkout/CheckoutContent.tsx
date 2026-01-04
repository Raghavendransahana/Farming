"use client";

import { Stack, Grid, Paper, Text } from '@mantine/core';
import { UserDetails } from '@/contexts/AuthContext';
import { PaymentMethodSelector } from '@/components/payment/PaymentMethodSelector';
import { DeliveryOption } from '@/components/payment/DeliveryOption';
import { CheckoutSummary } from '@/components/payment/CheckoutSummary';
import { AddressForm } from '@/components/payment/AddressForm';
import { useCheckout } from '@/contexts/CheckoutContext';
import { CartItem } from '@/contexts/CartContext';

const DELIVERY_CHARGE = 50;

interface CheckoutContentProps {
  checkoutData: { items: CartItem[]; type: string };
  userDetails: UserDetails | null;
}

export function CheckoutContent({ checkoutData, userDetails }: CheckoutContentProps) {
  const {
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
    subtotal,
    deliveryCharge,
    codCharge,
    tax,
    total,
    hasExistingDetails,
  } = useCheckout();

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
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
}
