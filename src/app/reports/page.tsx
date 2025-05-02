'use client';

import { useState } from 'react';

interface MonthlyReport {
  month: string;
  totalSales: number;
  totalExpenses: number;
  profit: number;
}

export default function Reports() {
  const [monthlyReports] = useState<MonthlyReport[]>([
    {
      month: 'January 2024',
      totalSales: 25000,
      totalExpenses: 15000,
      profit: 10000
    }
  ]);

  const [yearlyTotals] = useState({
    sales: 25000,
    expenses: 15000,
    profit: 10000
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profit & Loss Reports</h1>

      {/* Yearly Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
          <p className="text-2xl font-semibold text-gray-900">${yearlyTotals.sales}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
          <p className="text-2xl font-semibold text-gray-900">${yearlyTotals.expenses}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Net Profit</h3>
          <p className="text-2xl font-semibold text-green-600">${yearlyTotals.profit}</p>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Monthly Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenses</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyReports.map((report, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${report.totalSales}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${report.totalExpenses}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${report.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${report.profit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}