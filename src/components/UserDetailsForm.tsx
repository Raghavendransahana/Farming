"use client";

import { useState } from 'react';
import { TextInput, Button, Stack, Paper, Title, Text, Group } from '@mantine/core';
import { User, MapPin, Home } from 'lucide-react';

interface UserDetailsFormProps {
  onSubmit: (details: UserDetails) => void;
  onSkip: () => void;
}

export interface UserDetails {
  name: string;
  address: string;
  location: string;
}

export function UserDetailsForm({ onSubmit, onSkip }: UserDetailsFormProps) {
  const [formData, setFormData] = useState<UserDetails>({
    name: '',
    address: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof UserDetails) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Paper 
      shadow="sm" 
      p="xl" 
      radius="lg"
      style={{ 
        maxWidth: 500, 
        width: '100%',
        border: '1px solid #e9ecef'
      }}
    >
      <Stack gap="md">
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <Title order={2} style={{ color: '#2B8A3E', marginBottom: '0.5rem' }}>
            Complete Your Profile
          </Title>
          <Text size="sm" c="dimmed">
            Help us personalize your experience
          </Text>
        </div>

        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange('name')}
              leftSection={<User size={18} color="#2B8A3E" />}
              styles={{
                input: {
                  borderColor: '#dee2e6',
                  '&:focus': {
                    borderColor: '#2B8A3E',
                  }
                },
                label: {
                  color: '#495057',
                  fontWeight: 500,
                  marginBottom: '0.5rem'
                }
              }}
            />

            <TextInput
              label="Address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange('address')}
              leftSection={<Home size={18} color="#2B8A3E" />}
              styles={{
                input: {
                  borderColor: '#dee2e6',
                  '&:focus': {
                    borderColor: '#2B8A3E',
                  }
                },
                label: {
                  color: '#495057',
                  fontWeight: 500,
                  marginBottom: '0.5rem'
                }
              }}
            />

            <TextInput
              label="Location"
              placeholder="City, State"
              value={formData.location}
              onChange={handleChange('location')}
              leftSection={<MapPin size={18} color="#2B8A3E" />}
              styles={{
                input: {
                  borderColor: '#dee2e6',
                  '&:focus': {
                    borderColor: '#2B8A3E',
                  }
                },
                label: {
                  color: '#495057',
                  fontWeight: 500,
                  marginBottom: '0.5rem'
                }
              }}
            />

            <Group grow mt="md">
              <Button
                variant="outline"
                color="gray"
                onClick={onSkip}
                styles={{
                  root: {
                    borderColor: '#dee2e6',
                    color: '#868e96',
                    '&:hover': {
                      backgroundColor: '#f8f9fa',
                    }
                  }
                }}
              >
                Skip for Now
              </Button>
              
              <Button
                type="submit"
                styles={{
                  root: {
                    backgroundColor: '#2B8A3E',
                    '&:hover': {
                      backgroundColor: '#236d32',
                    }
                  }
                }}
              >
                Continue
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}
