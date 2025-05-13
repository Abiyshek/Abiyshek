import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../store/useCart';
import { useSearch } from '../store/useSearch';
import { Sidebar } from './Sidebar';

export function Header() {
  const navigate = useNavigate();
  const cartItems = useCart(state => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { searchQuery, setSearchQuery, performSearch } = useSearch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The actual search is performed in the ProductGrid component
    console.log('Searching for:', searchQuery);
  };

  return (
    <>
      <header className="bg-indigo-600 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-1 rounded-lg hover:bg-indigo-500 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="text-2xl font-bold ml-4">Quick Mart</Link>
            </div>
            
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-lg text-gray-900 focus:outline-none"
                  />
                  <button type="submit" className="absolute right-3 top-2.5">
                    <Search className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </form>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/account')}
                className="p-1 rounded-lg hover:bg-indigo-500 transition-colors"
              >
                <User className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="p-1 rounded-lg hover:bg-indigo-500 transition-colors relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}