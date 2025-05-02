'use client';

import { useState } from 'react';
import Image from 'next/image';

// Import SVG icons
import totalStockItemsSvg from '../../../public/svg/orders.svg';
import totalSalesSvg from '../../../public/svg/claims.svg';
import totalExpensesSvg from '../../../public/svg/pricing.svg';
import netProfitSvg from '../../../public/svg/inr.svg';

export default function Dashboard() {
  const [summaryData] = useState({
    totalStock: 150,
    totalSales: 25000,
    totalExpenses: 15000,
    profit: 10000,
    lowStockItems: 5
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Overview</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Stock Items */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Stock Items</p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{summaryData.totalStock}</h2>
              </div>
              <div className="p-2">
                <Image src={totalStockItemsSvg} alt="Inventory" width={32} height={32} className="text-blue-500 dark:text-blue-400" />
              </div>
            </div>
          </div>

          {/* Total Sales */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Sales</p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">${summaryData.totalSales}</h2>
              </div>
              <div className="p-2">
                <Image src={totalSalesSvg} alt="Sales" width={32} height={32} className="text-green-500 dark:text-green-400" />
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Expenses</p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">${summaryData.totalExpenses}</h2>
              </div>
              <div className="p-2">
                <Image src={totalExpensesSvg} alt="Expenses" width={36} height={36} className="text-red-500 dark:text-red-400" />
              </div>
            </div>
          </div>

          {/* Profit */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Net Profit</p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">${summaryData.profit}</h2>
              </div>
              <div className="p-2">
                <Image src={netProfitSvg} alt="Profit" width={28} height={28} className="text-purple-500 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Low Stock Alert Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Low Stock Alerts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Threshold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Sample Item</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">10</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Critical</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">2024-01-20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">Sample Item</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Sale</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">$500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}