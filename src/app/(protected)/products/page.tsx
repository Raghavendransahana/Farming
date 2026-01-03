"use client";

import { ProductsHeader } from '@/components/products/ProductsHeader';
import { ProductsGrid } from '@/components/products/ProductsGrid';

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <ProductsHeader />
      <ProductsGrid />
    </div>
  );
}