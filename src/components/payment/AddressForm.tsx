"use client";

import { TextInput, Stack, Text } from '@mantine/core';
import { User, Home, MapPin } from 'lucide-react';
import { UserDetails } from '@/contexts/AuthContext';

interface AddressFormProps {
  address: UserDetails;
  onChange: (field: keyof UserDetails, value: string) => void;
}

export function AddressForm({ address, onChange }: AddressFormProps) {
  return (
    <Stack gap="md">
      <Text size="lg" fw={600} c="#2B8A3E">
        Delivery Address
      </Text>
      
      <TextInput
        label="Full Name"
        placeholder="Enter your full name"
        value={address.name}
        onChange={(e) => onChange('name', e.target.value)}
        leftSection={<User size={18} color="#2B8A3E" />}
        required
        styles={{
          input: { '&:focus': { borderColor: '#2B8A3E' } },
          label: { fontWeight: 500 }
        }}
      />

      <TextInput
        label="Address"
        placeholder="Enter your complete address"
        value={address.address}
        onChange={(e) => onChange('address', e.target.value)}
        leftSection={<Home size={18} color="#2B8A3E" />}
        required
        styles={{
          input: { '&:focus': { borderColor: '#2B8A3E' } },
          label: { fontWeight: 500 }
        }}
      />

      <TextInput
        label="Location"
        placeholder="City, State"
        value={address.location}
        onChange={(e) => onChange('location', e.target.value)}
        leftSection={<MapPin size={18} color="#2B8A3E" />}
        required
        styles={{
          input: { '&:focus': { borderColor: '#2B8A3E' } },
          label: { fontWeight: 500 }
        }}
      />
    </Stack>
  );
}
