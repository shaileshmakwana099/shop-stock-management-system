'use client';

import { useState } from 'react';

export default function Profile() {
  const [profile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    joinDate: '2024-01-01',
    location: 'New York, USA',
    department: 'Management',
    phone: '+1 (555) 123-4567'
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Banner */}
          <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200"></div>

          <div className="px-8 pb-8">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center -mt-16 mb-8">
              <div className="h-32 w-32 rounded-full ring-4 ring-white bg-gray-100 shadow-xl flex items-center justify-center overflow-hidden">
                <span className="text-4xl font-semibold text-gray-700">
                  {profile.name.charAt(0)}
                </span>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
                <p className="text-gray-600 font-medium">{profile.role}</p>
                <p className="text-gray-500 mt-1">{profile.location}</p>
              </div>
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <label className="block text-sm font-medium text-gray-500">Full Name</label>
                      <p className="mt-1 text-sm text-gray-800 font-medium">{profile.name}</p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <label className="block text-sm font-medium text-gray-500">Email Address</label>
                      <p className="mt-1 text-sm text-gray-800 font-medium">{profile.email}</p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                      <p className="mt-1 text-sm text-gray-800 font-medium">{profile.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Work Information</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <label className="block text-sm font-medium text-gray-500">Department</label>
                      <p className="mt-1 text-sm text-gray-800 font-medium">{profile.department}</p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <label className="block text-sm font-medium text-gray-500">Role</label>
                      <p className="mt-1 text-sm text-gray-800 font-medium">{profile.role}</p>
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-sm">
                      <label className="block text-sm font-medium text-gray-500">Join Date</label>
                      <p className="mt-1 text-sm text-gray-800 font-medium">
                        {new Date(profile.joinDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex space-x-4">
              <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                Edit Profile
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}