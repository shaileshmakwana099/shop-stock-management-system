'use client';

import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

export default function Notifications() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Low Stock Alert',
      message: 'Electronics item is running low on stock',
      time: '5 minutes ago',
      isRead: false
    },
    {
      id: '2',
      title: 'Payment Due',
      message: 'Payment pending for Supplier One',
      time: '1 hour ago',
      isRead: false
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-6 ${!notification.isRead ? 'bg-blue-50' : ''}`}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
                  <p className="mt-2 text-xs text-gray-400">{notification.time}</p>
                </div>
                {!notification.isRead && (
                  <div className="w-2.5 h-2.5 bg-blue-400 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}