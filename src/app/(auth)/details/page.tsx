"use client";

import { useRouter } from 'next/navigation';
import { UserDetailsForm, UserDetails } from '@/components/UserDetailsForm';
import { useAuth } from '@/contexts/AuthContext';

export default function UserDetailsPage() {
  const router = useRouter();
  const { userId, saveUserDetails } = useAuth();

  const handleSubmit = (details: UserDetails) => {
    saveUserDetails(details);
    router.push('/products');
  };

  const handleSkip = () => {
    router.push('/products');
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '2rem'
      }}
    >
      <UserDetailsForm onSubmit={handleSubmit} onSkip={handleSkip} />
    </div>
  );
}
