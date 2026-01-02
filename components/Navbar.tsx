"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, ShoppingBag, LogOut } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/products', label: 'Products', icon: ShoppingBag },
    { href: '/favorites', label: 'Favorites', icon: Heart },
  ];

  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    // Add logout logic here if needed
    console.log('Logging out...');
    // For now, just redirect to home or login page
    window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/products" className="flex items-center gap-2">
            <span className="text-2xl">N</span>
            <span className="text-xl font-bold text-gray-900">Native Farm</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    active
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
