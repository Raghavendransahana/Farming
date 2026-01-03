"use client";

import { Paper, Stack, Text, Divider, Group } from '@mantine/core';
import { CartItem } from '@/contexts/CartContext';
import Image from 'next/image';

interface CheckoutSummaryProps {
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  codCharge: number;
  tax: number;
  total: number;
}

export function CheckoutSummary({
  items,
  subtotal,
  deliveryCharge,
  codCharge,
  tax,
  total,
}: CheckoutSummaryProps) {
  return (
    <Paper shadow="sm" p="lg" radius="md" style={{ border: '1px solid #e9ecef', position: 'sticky', top: 20 }}>
      <Stack gap="md">
        <Text size="lg" fw={600} c="#2B8A3E">
          Order Summary ({items.length})
        </Text>

        <Stack gap="sm">
          {items.map((item) => (
            <Group key={item.id} gap="sm" wrap="nowrap">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                style={{ borderRadius: 8, objectFit: 'cover' }}
              />
              <Stack gap={2} style={{ flex: 1 }}>
                <Text size="sm" fw={500} lineClamp={1}>{item.name}</Text>
                <Text size="xs" c="dimmed">Qty: {item.quantity}</Text>
              </Stack>
              <Text size="sm" fw={500}>{item.price}</Text>
            </Group>
          ))}
        </Stack>

        <Divider />

        <Stack gap="xs">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">Subtotal</Text>
            <Text size="sm" fw={500}>₹{subtotal.toLocaleString()}</Text>
          </Group>
          
          {deliveryCharge > 0 && (
            <Group justify="space-between">
              <Text size="sm" c="dimmed">Delivery Charges</Text>
              <Text size="sm" fw={500} c="#2B8A3E">₹{deliveryCharge}</Text>
            </Group>
          )}
          
          {codCharge > 0 && (
            <Group justify="space-between">
              <Text size="sm" c="dimmed">COD Charges</Text>
              <Text size="sm" fw={500} c="#2B8A3E">₹{codCharge}</Text>
            </Group>
          )}
          
          <Group justify="space-between">
            <Text size="sm" c="dimmed">Tax</Text>
            <Text size="sm" fw={500}>₹{tax.toLocaleString()}</Text>
          </Group>
        </Stack>

        <Divider />

        <Group justify="space-between">
          <Text size="lg" fw={700}>Total</Text>
          <Text size="xl" fw={700} c="#2B8A3E">₹{total.toLocaleString()}</Text>
        </Group>
      </Stack>
    </Paper>
  );
}
