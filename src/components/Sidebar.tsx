import React from 'react';
import { Home, User, ShoppingCart, Heart, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: User, label: 'Account Details', path: '/account' },
    { icon: ShoppingCart, label: 'Cart Details', path: '/cart' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: LogOut, label: 'Log Out', path: '/logout' }
  ];

  const handleNavigation = (path: string) => {
    if (path === '/logout') {
      // Clear authentication and redirect to login
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
      onClose(); // Close sidebar
      return;
    }
    navigate(path);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">Menu</h2>
          <nav>
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button
                    className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 w-full p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
