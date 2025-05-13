import React, { useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { useSearch } from '../store/useSearch';
import { products } from '../data/products';

export function ProductGrid() {
  const { searchQuery, searchResults, performSearch } = useSearch();

  useEffect(() => {
    performSearch(products);
  }, [searchQuery, performSearch]);

  const displayProducts = searchQuery ? searchResults : products;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      {displayProducts.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No products found matching your search.
        </div>
      )}
    </div>
  );
}