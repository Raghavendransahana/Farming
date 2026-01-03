"use client";

import { Paper, Stack, Text, Group, Badge, Divider } from '@mantine/core';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import Image from 'next/image';

export default function OrdersPage() {
  const { orders } = useOrder();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'orange';
      case 'confirmed': return 'blue';
      case 'delivered': return 'green';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package size={16} />;
      case 'confirmed': return <Truck size={16} />;
      case 'delivered': return <CheckCircle size={16} />;
      default: return <Package size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Group mb="xl">
          <Package size={32} color="#2B8A3E" />
          <Text size="2rem" fw={700} c="#2B8A3E">
            My Orders ({orders.length})
          </Text>
        </Group>

        {orders.length === 0 ? (
          <Paper shadow="sm" p="xl" radius="lg" style={{ textAlign: 'center' }}>
            <Stack gap="md" align="center">
              <Package size={80} color="#dee2e6" />
              <Text size="xl" fw={600} c="dimmed">No orders yet</Text>
              <Text c="dimmed">Your orders will appear here</Text>
            </Stack>
          </Paper>
        ) : (
          <Stack gap="lg">
            {orders.map((order) => (
              <Paper key={order.id} shadow="sm" p="lg" radius="md" style={{ border: '1px solid #e9ecef' }}>
                <Stack gap="md">
                 
                  <Group justify="space-between">
                    <div>
                      <Text size="sm" c="dimmed">Order ID</Text>
                      <Text fw={600} c="#2B8A3E">{order.id}</Text>
                    </div>
                    <Badge
                      color={getStatusColor(order.status)}
                      leftSection={getStatusIcon(order.status)}
                      size="lg"
                      variant="light"
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </Group>

                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      {new Date(order.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </Text>
                    <Group gap="xs">
                      <Text size="sm" c="dimmed">Payment:</Text>
                      <Badge variant="outline" color="gray">
                        {order.paymentMethod.toUpperCase()}
                      </Badge>
                    </Group>
                  </Group>

                  <Divider />

                
                  <Stack gap="sm">
                    {order.items.map((item) => (
                      <Group key={item.id} gap="md" wrap="nowrap">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          style={{ borderRadius: 8, objectFit: 'cover' }}
                        />
                        <Stack gap={2} style={{ flex: 1 }}>
                          <Text fw={500} lineClamp={1}>{item.name}</Text>
                          <Text size="sm" c="dimmed">Qty: {item.quantity}</Text>
                        </Stack>
                        <Text fw={600}>{item.price}</Text>
                      </Group>
                    ))}
                  </Stack>

                  <Divider />

                
                  <Group justify="space-between">
                    <Stack gap={4}>
                      <Text size="sm" fw={500}>Delivery</Text>
                      <Text size="xs" c="dimmed">
                        {order.needDelivery ? `${order.address.name}, ${order.address.location}` : 'Self Pickup'}
                      </Text>
                    </Stack>
                    <Stack gap={4} align="flex-end">
                      <Text size="sm" c="dimmed">Total Amount</Text>
                      <Text size="xl" fw={700} c="#2B8A3E">₹{order.total.toLocaleString()}</Text>
                    </Stack>
                  </Group>
                </Stack>
              </Paper>
            ))}
          </Stack>
        )}
      </div>
    </div>
  );
}
