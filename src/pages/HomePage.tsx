import React from 'react';
import { ProductGrid } from '../components/ProductGrid';

export function HomePage() {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
      <ProductGrid />
    </>
  );
}