import React from 'react';
import { Heart } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export function WishlistPage() {
  // For demo purposes, showing first two products as wishlist items
  const wishlistItems = products.slice(0, 2);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your Wishlist is Empty</h3>
          <p className="text-gray-600">Save items you love to your wishlist</p>
        </div>
      )}
    </div>
  );
}