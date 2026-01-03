"use client";

import { Radio, Stack, Text, Group } from '@mantine/core';
import { Truck, AlertCircle } from 'lucide-react';

interface DeliveryOptionProps {
  needDelivery: boolean;
  onChange: (value: boolean) => void;
  deliveryCharge: number;
}

export function DeliveryOption({ needDelivery, onChange, deliveryCharge }: DeliveryOptionProps) {
  return (
    <Stack gap="md">
      <Text size="lg" fw={600} c="#2B8A3E">
        Delivery Option
      </Text>
      
      <Radio.Group
        value={needDelivery ? 'yes' : 'no'}
        onChange={(val) => onChange(val === 'yes')}
      >
        <Stack gap="sm">
          <Radio
            value="yes"
            label={
              <Group gap="xs">
                <Truck size={20} color="#2B8A3E" />
                <Text>Need delivery to your location</Text>
                <Text size="sm" c="dimmed" fw={500}>(+₹{deliveryCharge})</Text>
              </Group>
            }
            styles={{
              radio: { '&:checked': { backgroundColor: '#2B8A3E', borderColor: '#2B8A3E' } }
            }}
          />
          
          <Radio
            value="no"
            label={
              <Group gap="xs">
                <AlertCircle size={20} color="#2B8A3E" />
                <Text>Self pickup (No delivery charges)</Text>
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
