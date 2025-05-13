import React, { useEffect, useState } from 'react';
import { User, Phone, MapPin } from 'lucide-react';

type UserInfo = {
  username: string;
  phone: string;
  address: string;
};

export function AccountPage() {
  const [userDetails, setUserDetails] = useState<UserInfo | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserDetails(parsed);
    }
  }, []);

  if (!userDetails) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg text-red-600">No account found. Please register first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Account Details</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-8">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-indigo-600" />
          </div>
          <div className="ml-6">
            <h3 className="text-xl font-semibold text-gray-900">{userDetails.username}</h3>
            <p className="text-gray-500">Member since April 2025</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-gray-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Phone</p>
              <p className="text-gray-900">{userDetails.phone}</p>
            </div>
          </div>

          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Address</p>
              <p className="text-gray-900">{userDetails.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
            Edit Profile
          </button>
          <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
