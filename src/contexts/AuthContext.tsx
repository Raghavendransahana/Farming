"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export interface UserDetails {
  name: string;
  address: string;
  location: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  userDetails: UserDetails | null;
  login: (userId: string) => void;
  loginWithDetails: (userId: string) => void;
  logout: () => void;
  saveUserDetails: (details: UserDetails) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUserId = localStorage.getItem('userId');
    const storedDetails = localStorage.getItem('userDetails');
    
    if (storedUserId) {
      setIsAuthenticated(true);
      setUserId(storedUserId);
      
      if (storedDetails) {
        setUserDetails(JSON.parse(storedDetails));
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Redirect logic
    if (!isLoading) {
      const isAuthRoute = pathname?.startsWith('/login') || pathname?.startsWith('/signup');
      const isDetailsRoute = pathname?.startsWith('/details');
      const isProtectedRoute = pathname?.startsWith('/products') || 
                               pathname?.startsWith('/cart') || 
                               pathname?.startsWith('/checkout') ||
                               pathname?.startsWith('/orders') ||
                               pathname?.startsWith('/success');

      if (!isAuthenticated && isProtectedRoute) {
        // Not authenticated and trying to access protected route -> redirect to login
        router.push('/login');
      } else if (isAuthenticated && (isAuthRoute && !isDetailsRoute)) {
        // Authenticated and on auth route (but not details) -> redirect to products
        router.push('/products');
      }
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  const login = (userId: string) => {
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setUserId(userId);
    router.push('/products');
  };

  const loginWithDetails = (userId: string) => {
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setUserId(userId);
    router.push('/details');
  };

  const saveUserDetails = (details: UserDetails) => {
    localStorage.setItem('userDetails', JSON.stringify(details));
    setUserDetails(details);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userDetails');
    setIsAuthenticated(false);
    setUserId(null);
    setUserDetails(null);
    router.push('/login');
  };

  // Don't render children until we've checked authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, userDetails, login, loginWithDetails, logout, saveUserDetails }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
