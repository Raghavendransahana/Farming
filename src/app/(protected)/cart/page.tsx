"use client";

import { useRouter } from 'next/navigation';
import { Button, Stack, Text, Paper, Group, ActionIcon } from '@mantine/core';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, buyAllInCart } = useCart();

  const handleBuyAll = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    buyAllInCart();
    router.push('/checkout');
  };

  const parsePrice = (price: string): number => {
    return parseInt(price.replace(/[₹,]/g, '')) || 0;
  };

  const cartTotal = cartItems.reduce((sum, item) => 
    sum + parsePrice(item.price) * item.quantity, 0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Group mb="xl">
          <ShoppingCart size={32} color="#2B8A3E" />
          <Text size="2rem" fw={700} c="#2B8A3E">
            Your Cart ({cartItems.length})
          </Text>
        </Group>

        {cartItems.length === 0 ? (
          <Paper shadow="sm" p="xl" radius="lg" style={{ textAlign: 'center' }}>
            <Stack gap="md" align="center">
              <ShoppingCart size={80} color="#dee2e6" />
              <Text size="xl" fw={600} c="dimmed">Your cart is empty</Text>
              <Text c="dimmed">Add some products to get started</Text>
              <Button
                mt="md"
                onClick={() => router.push('/products')}
                styles={{
                  root: {
                    backgroundColor: '#2B8A3E',
                    '&:hover': { backgroundColor: '#236d32' }
                  }
                }}
              >
                Browse Products
              </Button>
            </Stack>
          </Paper>
        ) : (
          <Stack gap="lg">
            {cartItems.map((item) => (
              <Paper key={item.id} shadow="sm" p="md" radius="md" style={{ border: '1px solid #e9ecef' }}>
                <Group wrap="nowrap" gap="md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                    style={{ borderRadius: 8, objectFit: 'cover' }}
                  />

                  <Stack style={{ flex: 1 }} gap="xs">
                    <Text size="lg" fw={600}>{item.name}</Text>
                    <Text size="sm" c="dimmed" lineClamp={2}>{item.description}</Text>
                    <Group gap="xs">
                      <Text size="xl" fw={700} c="#2B8A3E">{item.price}</Text>
                      {item.originalPrice && (
                        <Text size="sm" c="dimmed" td="line-through">{item.originalPrice}</Text>
                      )}
                    </Group>
                  </Stack>

                  <Stack gap="md" align="center">
                    <Group gap="xs">
                      <ActionIcon
                        variant="outline"
                        color="#2B8A3E"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </ActionIcon>
                      <Text fw={600} style={{ minWidth: 30, textAlign: 'center' }}>
                        {item.quantity}
                      </Text>
                      <ActionIcon
                        variant="outline"
                        color="#2B8A3E"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </ActionIcon>
                    </Group>

                    <ActionIcon
                      variant="light"
                      color="red"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={20} />
                    </ActionIcon>
                  </Stack>
                </Group>
              </Paper>
            ))}

            <Paper shadow="md" p="lg" radius="md" style={{ border: '2px solid #2B8A3E' }}>
              <Stack gap="md">
                <Group justify="space-between">
                  <Text size="xl" fw={700}>Cart Total</Text>
                  <Text size="2rem" fw={700} c="#2B8A3E">₹{cartTotal.toLocaleString()}</Text>
                </Group>

                <Button
                  fullWidth
                  size="lg"
                  onClick={handleBuyAll}
                  styles={{
                    root: {
                      backgroundColor: '#2B8A3E',
                      '&:hover': { backgroundColor: '#236d32' }
                    }
                  }}
                >
                  Proceed to Checkout
                </Button>
              </Stack>
            </Paper>
          </Stack>
        )}
      </div>
    </div>
  );
}
