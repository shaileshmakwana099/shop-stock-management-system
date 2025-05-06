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

  // Sample data for low stock items
  const lowStockItems = [
    { name: 'Sample Item 1', currentStock: 5, threshold: 10, status: 'Critical' },
    { name: 'Sample Item 2', currentStock: 8, threshold: 15, status: 'Critical' },
    { name: 'Sample Item 3', currentStock: 12, threshold: 20, status: 'Warning' },
    { name: 'Sample Item 4', currentStock: 7, threshold: 12, status: 'Critical' },
    { name: 'Sample Item 5', currentStock: 9, threshold: 15, status: 'Warning' },
  ];

  // Sample data for recent transactions
  const recentTransactions = [
    { date: '2024-01-20', item: 'Sample Item 1', type: 'Sale', amount: 500 },
    { date: '2024-01-19', item: 'Sample Item 2', type: 'Purchase', amount: 800 },
    { date: '2024-01-18', item: 'Sample Item 3', type: 'Sale', amount: 350 },
    { date: '2024-01-17', item: 'Sample Item 4', type: 'Sale', amount: 600 },
    { date: '2024-01-16', item: 'Sample Item 5', type: 'Purchase', amount: 750 },
  ];

  // Add sample data for supplier bills
  const supplierBills = [
    { 
      supplier: 'Supplier A',
      invoiceNo: 'INV-001',
      amount: 2500,
      dueDate: '2024-02-01',
      status: 'Overdue'
    },
    { 
      supplier: 'Supplier B',
      invoiceNo: 'INV-002',
      amount: 1800,
      dueDate: '2024-02-05',
      status: 'Due Soon'
    },
    { 
      supplier: 'Supplier C',
      invoiceNo: 'INV-003',
      amount: 3200,
      dueDate: '2024-02-10',
      status: 'Due Soon'
    },
    {
      supplier: 'Supplier D',
      invoiceNo: 'INV-004',
      amount: 1500,
      dueDate: '2024-01-30',
      status: 'Overdue'
    },
    {
      supplier: 'Supplier E',
      invoiceNo: 'INV-005',
      amount: 2100,
      dueDate: '2024-02-15',
      status: 'Upcoming'
    }
  ];

  // Add new state for time filter
  const [timeFilter, setTimeFilter] = useState('today');

  // Add sample data for top selling products
  const topSellingProducts = {
    today: [
      { name: 'Product A', sales: 45, revenue: 2250 },
      { name: 'Product B', sales: 32, revenue: 1600 },
      { name: 'Product C', sales: 28, revenue: 1400 },
      { name: 'Product D', sales: 25, revenue: 1250 },
      { name: 'Product E', sales: 20, revenue: 1000 },
    ],
    weekly: [
      { name: 'Product B', sales: 180, revenue: 9000 },
      { name: 'Product A', sales: 165, revenue: 8250 },
      { name: 'Product E', sales: 140, revenue: 7000 },
      { name: 'Product C', sales: 120, revenue: 6000 },
      { name: 'Product F', sales: 100, revenue: 5000 },
    ],
    monthly: [
      { name: 'Product A', sales: 750, revenue: 37500 },
      { name: 'Product B', sales: 680, revenue: 34000 },
      { name: 'Product D', sales: 580, revenue: 29000 },
      { name: 'Product E', sales: 520, revenue: 26000 },
      { name: 'Product C', sales: 480, revenue: 24000 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard Overview</h1>
        
        {/* Summary Cards */}
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
        
        {/* Two Column Layout for Tables */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Low Stock Alert Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Low Stock Alerts</h2>
              {/* <a href="/inventory/low-stocks" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                View All
              </a> */}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {lowStockItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.currentStock}/{item.threshold}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'Critical' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
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
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Item</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {recentTransactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{transaction.date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{transaction.item}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <span className={`${transaction.type === 'Sale' ? 'text-green-600' : 'text-blue-600'}`}>
                          ${transaction.amount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Supplier Bills Due Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Supplier Bills Due</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Supplier</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Invoice No</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {supplierBills.map((bill, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{bill.supplier}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{bill.invoiceNo}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">${bill.amount}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{bill.dueDate}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          bill.status === 'Overdue' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : bill.status === 'Due Soon'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                          {bill.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Top Selling Products section before the two-column layout */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Top Selling Products</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setTimeFilter('today')}
                  className={`px-4 py-2 text-sm rounded-md ${
                    timeFilter === 'today'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setTimeFilter('weekly')}
                  className={`px-4 py-2 text-sm rounded-md ${
                    timeFilter === 'weekly'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTimeFilter('monthly')}
                  className={`px-4 py-2 text-sm rounded-md ${
                    timeFilter === 'monthly'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Product Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Units Sold</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {topSellingProducts[timeFilter as keyof typeof topSellingProducts].map((product, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{product.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">{product.sales}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">${product.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}