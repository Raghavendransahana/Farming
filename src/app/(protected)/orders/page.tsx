"use client";

import { useState } from 'react';
import { Paper, Stack, Text, Group, Badge, Divider, Button, Tabs } from '@mantine/core';
import { Package, Truck, CheckCircle, RefreshCw, ShoppingBag } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import { useProduct } from '@/contexts/ProductContext';
import { ResaleForm, ResaleData } from '@/components/ResaleForm';
import { CartItem } from '@/contexts/CartContext';
import { Animal } from '@/lib/productsData';
import Image from 'next/image';

export default function OrdersPage() {
  const { orders } = useOrder();
  const { userDetails, saveUserDetails } = useAuth();
  const { products, addProduct } = useProduct();
  const [selectedItemForResale, setSelectedItemForResale] = useState<CartItem | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>('orders');

  // Filter products to get only user's resale items
  const userResaleProducts = products.filter(product => 
    product.isResale && (
      product.ownerName === userDetails?.name ||
      product.location === userDetails?.location
    )
  );

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

  const handleResaleSubmit = (data: ResaleData) => {
    if (!selectedItemForResale) return;
    if (data.address) {
      saveUserDetails(data.address);
    }
    const newProduct: Animal = {
      ...selectedItemForResale,
      id: `RESALE${Date.now()}${Math.random().toString(36).substr(2, 9)}`,
      price: `₹${data.newPrice.toLocaleString()}`,
      previousPrice: selectedItemForResale.price,
      ownerName: data.address.name,
      ownerPhone: userDetails?.name || data.address.name,
      ownerEmail: '',
      location: data.address.location,
      state: data.address.location,
      isResale: true,
      isExternal: data.isExternal,
      resaleReason: data.resaleReason,
    };

    addProduct(newProduct);
    setSelectedItemForResale(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <Group mb="xl">
          <Package size={32} color="#2B8A3E" />
          <Text size="2rem" fw={700} c="#2B8A3E">
            My Orders & Resale
          </Text>
        </Group>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List mb="lg">
            <Tabs.Tab value="orders" leftSection={<Package size={18} />}>
              Orders ({orders.length})
            </Tabs.Tab>
            <Tabs.Tab value="resale" leftSection={<RefreshCw size={18} />}>
              Put for Resale ({userResaleProducts.length})
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="orders">
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
                          <Group key={item.id} gap="md" wrap="nowrap" justify="space-between">
                            <Group gap="md" wrap="nowrap">
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
                            {order.status === 'delivered' && (
                              <Button
                                variant="outline"
                                color="#2B8A3E"
                                leftSection={<RefreshCw size={16} />}
                                onClick={() => setSelectedItemForResale(item)}
                                size="sm"
                              >
                                Resale
                              </Button>
                            )}
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
          </Tabs.Panel>

          <Tabs.Panel value="resale">
            {userResaleProducts.length === 0 ? (
              <Paper shadow="sm" p="xl" radius="lg" style={{ textAlign: 'center' }}>
                <Stack gap="md" align="center">
                  <RefreshCw size={80} color="#dee2e6" />
                  <Text size="xl" fw={600} c="dimmed">No items put for resale</Text>
                  <Text c="dimmed">Items you list for resale will appear here</Text>
                </Stack>
              </Paper>
            ) : (
              <Stack gap="lg">
                {userResaleProducts.map((product) => (
                  <Paper key={product.id} shadow="sm" p="lg" radius="md" style={{ border: '1px solid #e9ecef' }}>
                    <Group gap="md" wrap="nowrap" align="flex-start">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={120}
                        height={120}
                        style={{ borderRadius: 8, objectFit: 'cover' }}
                      />
                      <Stack gap="sm" style={{ flex: 1 }}>
                        <Group justify="space-between">
                          <div>
                            <Text size="lg" fw={600}>{product.name}</Text>
                            <Text size="sm" c="dimmed">{product.type}</Text>
                          </div>
                          <Badge color="orange" variant="light" leftSection={<RefreshCw size={14} />}>
                            Resale
                          </Badge>
                        </Group>
                        
                        <Group gap="lg">
                          <div>
                            <Text size="xs" c="dimmed">Current Price</Text>
                            <Text size="xl" fw={700} c="#2B8A3E">{product.price}</Text>
                          </div>
                          {product.previousPrice && (
                            <div>
                              <Text size="xs" c="dimmed">Original Price</Text>
                              <Text size="sm" c="dimmed" td="line-through">{product.previousPrice}</Text>
                            </div>
                          )}
                        </Group>

                        {product.resaleReason && (
                          <div>
                            <Text size="sm" fw={500} c="dimmed">Reason for resale:</Text>
                            <Text size="sm">{product.resaleReason}</Text>
                          </div>
                        )}

                        <Group gap="xs">
                          <Text size="sm" c="dimmed">Location:</Text>
                          <Text size="sm">{product.location}</Text>
                        </Group>
                      </Stack>
                    </Group>
                  </Paper>
                ))}
              </Stack>
            )}
          </Tabs.Panel>
        </Tabs>
      </div>

      {selectedItemForResale && (
        <ResaleForm
          isOpen={!!selectedItemForResale}
          orderItem={selectedItemForResale}
          userDetails={userDetails}
          onSubmit={handleResaleSubmit}
          onClose={() => setSelectedItemForResale(null)}
        />
      )}
    </div>
  );
}
