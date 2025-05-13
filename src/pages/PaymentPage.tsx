import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import { useCart } from '../store/useCart';

export function PaymentPage() {
  const navigate = useNavigate();
  const { items } = useCart();
  const [loading, setLoading] = useState(false);

  // Correct total calculation
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    alert('Payment successful! Thank you for your purchase.');
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
        <div className="divide-y divide-gray-200">
          {items.map((item) => (
            <div key={item.product.id} className="py-4 flex justify-between">
              <div>
                <p className="text-gray-900">{item.product.name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="text-gray-900">Rs.{(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-indigo-600">Rs.{total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center mb-6">
          <CreditCard className="w-6 h-6 text-indigo-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
              Name on Card
            </label>
            <input type="text" id="cardName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>

          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input type="text" id="cardNumber" required pattern="[0-9]{16}" placeholder="1234 5678 9012 3456" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input type="text" id="expiry" required placeholder="MM/YY" pattern="(0[1-9]|1[0-2])\/([0-9]{2})" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                CVV
              </label>
              <input type="text" id="cvv" required pattern="[0-9]{3,4}" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between">
            <span className="font-semibold">Total Payment</span>
            <span className="font-bold text-indigo-600">Rs.{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6">
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>{loading ? 'Processing...' : `Pay Rs.${total.toFixed(2)}`}</span>
          </button>
        </div>

        <p className="mt-4 text-sm text-gray-500 text-center">Your payment information is encrypted and secure</p>
      </form>
    </div>
  );
}
