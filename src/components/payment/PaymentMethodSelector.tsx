"use client";

import { Radio, TextInput, Group, Stack, Text } from '@mantine/core';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';

interface PaymentMethodSelectorProps {
  selected: 'card' | 'upi' | 'cod';
  onChange: (method: 'card' | 'upi' | 'cod') => void;
  cardData?: {
    number: string;
    name: string;
    expiry: string;
    cvv: string;
  };
  upiId?: string;
  onCardChange?: (field: string, value: string) => void;
  onUpiChange?: (value: string) => void;
}

export function PaymentMethodSelector({
  selected,
  onChange,
  cardData,
  upiId,
  onCardChange,
  onUpiChange,
}: PaymentMethodSelectorProps) {
  return (
    <Stack gap="md">
      <Text size="lg" fw={600} c="#2B8A3E">
        Select Payment Method
      </Text>
      
      <Radio.Group value={selected} onChange={(val) => onChange(val as 'card' | 'upi' | 'cod')}>
        <Stack gap="sm">
          <Radio
            value="card"
            label={
              <Group gap="xs">
                <CreditCard size={20} color="#2B8A3E" />
                <Text>Credit/Debit Card</Text>
              </Group>
            }
            styles={{
              radio: { '&:checked': { backgroundColor: '#2B8A3E', borderColor: '#2B8A3E' } }
            }}
          />
          
          {selected === 'card' && (
            <Stack gap="sm" ml="xl" mt="xs">
              <TextInput
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={cardData?.number || ''}
                onChange={(e) => onCardChange?.('number', e.target.value)}
                maxLength={19}
                styles={{ input: { '&:focus': { borderColor: '#2B8A3E' } } }}
              />
              <TextInput
                label="Cardholder Name"
                placeholder="Name"
                value={cardData?.name || ''}
                onChange={(e) => onCardChange?.('name', e.target.value)}
                styles={{ input: { '&:focus': { borderColor: '#2B8A3E' } } }}
              />
              <Group grow>
                <TextInput
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={cardData?.expiry || ''}
                  onChange={(e) => onCardChange?.('expiry', e.target.value)}
                  maxLength={5}
                  styles={{ input: { '&:focus': { borderColor: '#2B8A3E' } } }}
                />
                <TextInput
                  label="CVV"
                  placeholder="123"
                  value={cardData?.cvv || ''}
                  onChange={(e) => onCardChange?.('cvv', e.target.value)}
                  maxLength={3}
                  type="password"
                  styles={{ input: { '&:focus': { borderColor: '#2B8A3E' } } }}
                />
              </Group>
            </Stack>
          )}

          <Radio
            value="upi"
            label={
              <Group gap="xs">
                <Smartphone size={20} color="#2B8A3E" />
                <Text>UPI</Text>
              </Group>
            }
            styles={{
              radio: { '&:checked': { backgroundColor: '#2B8A3E', borderColor: '#2B8A3E' } }
            }}
          />
          
          {selected === 'upi' && (
            <TextInput
              ml="xl"
              mt="xs"
              label="UPI ID"
              placeholder="yourname@upi"
              value={upiId || ''}
              onChange={(e) => onUpiChange?.(e.target.value)}
              styles={{ input: { '&:focus': { borderColor: '#2B8A3E' } } }}
            />
          )}

          <Radio
            value="cod"
            label={
              <Group gap="xs">
                <Banknote size={20} color="#2B8A3E" />
                <Text>Cash on Delivery</Text>
                <Text size="sm" c="dimmed" fw={500}>(+₹100)</Text>
              </Group>
            }
            styles={{
              radio: { '&:checked': { backgroundColor: '#2B8A3E', borderColor: '#2B8A3E' } }
            }}
          />
        </Stack>
      </Radio.Group>
    </Stack>
  );
}
