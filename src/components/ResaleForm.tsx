"use client";

import { useState } from 'react';
import { Modal, Stack, TextInput, Textarea, NumberInput, Checkbox, Button, Text, Group, Alert } from '@mantine/core';
import { DollarSign, AlertCircle } from 'lucide-react';
import { UserDetails } from '@/contexts/AuthContext';
import { AddressForm } from './payment/AddressForm';
import { CartItem } from '@/contexts/CartContext';

interface ResaleFormProps {
  isOpen: boolean;
  orderItem: CartItem;
  userDetails: UserDetails | null;
  onSubmit: (data: ResaleData) => void;
  onClose: () => void;
}

export interface ResaleData {
  address: UserDetails;
  newPrice: number;
  resaleReason?: string;
  isExternal: boolean;
}

export function ResaleForm({ isOpen, orderItem, userDetails, onSubmit, onClose }: ResaleFormProps) {
  const [address, setAddress] = useState<UserDetails>(
    userDetails || { name: '', address: '', location: '' }
  );
  const [newPrice, setNewPrice] = useState<number | string>('');
  const [resaleReason, setResaleReason] = useState('');
  const [isExternal, setIsExternal] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Parse original price from orderItem.price (format: "₹65,000")
  const originalPriceNum = parseInt(orderItem.price.replace(/[₹,]/g, ''));
  const showReasonField = typeof newPrice === 'number' && newPrice > originalPriceNum;
  const needsAddress = !userDetails || !userDetails.name || !userDetails.address || !userDetails.location;

  const handleAddressChange = (field: keyof UserDetails, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    if (needsAddress) {
      if (!address.name.trim()) newErrors.push('Name is required');
      if (!address.address.trim()) newErrors.push('Address is required');
      if (!address.location.trim()) newErrors.push('Location is required');
    }

    const priceNum = typeof newPrice === 'number' ? newPrice : parseFloat(newPrice.toString());
    if (!newPrice || isNaN(priceNum) || priceNum <= 0) {
      newErrors.push('Price must be greater than zero');
    }

    if (showReasonField && !resaleReason.trim()) {
      newErrors.push('Please explain why the price is higher than the original');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        address,
        newPrice: typeof newPrice === 'number' ? newPrice : parseFloat(newPrice.toString()),
        resaleReason: showReasonField ? resaleReason : undefined,
        isExternal
      });
      // Reset form
      setNewPrice('');
      setResaleReason('');
      setIsExternal(false);
      setErrors([]);
    }
  };

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={
        <Text size="xl" fw={700} c="#2B8A3E">
          Resale: {orderItem.name}
        </Text>
      }
      size="lg"
      centered
    >
      <Stack gap="md">
        {errors.length > 0 && (
          <Alert icon={<AlertCircle size={16} />} title="Validation Errors" color="red">
            <Stack gap={4}>
              {errors.map((error, idx) => (
                <Text key={idx} size="sm">{error}</Text>
              ))}
            </Stack>
          </Alert>
        )}

        {needsAddress && (
          <>
            <AddressForm address={address} onChange={handleAddressChange} />
            <div style={{ borderTop: '1px solid #e9ecef', margin: '8px 0' }} />
          </>
        )}

        <NumberInput
          label="Resale Price"
          placeholder="Enter new price"
          value={newPrice}
          onChange={setNewPrice}
          leftSection={<DollarSign size={18} color="#2B8A3E" />}
          prefix="₹"
          thousandSeparator=","
          min={0}
          required
          styles={{
            input: { '&:focus': { borderColor: '#2B8A3E' } },
            label: { fontWeight: 500 }
          }}
        />

        {orderItem.price && (
          <Text size="sm" c="dimmed">
            Original price: {orderItem.price}
          </Text>
        )}

        {showReasonField && (
          <Textarea
            label="Why is the price higher?"
            placeholder="Explain the reason for price increase..."
            value={resaleReason}
            onChange={(e) => setResaleReason(e.target.value)}
            minRows={3}
            required
            styles={{
              input: { '&:focus': { borderColor: '#2B8A3E' } },
              label: { fontWeight: 500 }
            }}
          />
        )}

        <Checkbox
          label="Sold Externally (outside the platform)"
          checked={isExternal}
          onChange={(e) => setIsExternal(e.currentTarget.checked)}
          color="#2B8A3E"
        />

        <Group justify="flex-end" mt="md">
          <Button variant="outline" color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            styles={{
              root: {
                backgroundColor: '#2B8A3E',
                '&:hover': { backgroundColor: '#236d32' }
              }
            }}
          >
            List for Resale
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
