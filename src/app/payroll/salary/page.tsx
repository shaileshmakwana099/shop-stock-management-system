'use client';

import { useState } from 'react';

interface SalaryRecord {
  id: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: 'Paid' | 'Pending' | 'Processing';
}

export default function EmployeeSalary() {
  const [salaryRecords] = useState<SalaryRecord[]>([
    {
      id: '1',
      employeeName: 'John Doe',
      month: 'January 2024',
      baseSalary: 50000,
      bonus: 5000,
      deductions: 2000,
      netSalary: 53000,
      status: 'Paid'
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      month: 'January 2024',
      baseSalary: 35000,
      bonus: 2000,
      deductions: 1500,
      netSalary: 35500,
      status: 'Pending'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employee Salary</h1>
        <button className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Process Salary
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Base Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bonus</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Salary</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salaryRecords.map((record) => (
              <tr key={record.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.employeeName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.month}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${record.baseSalary}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${record.bonus}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${record.deductions}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${record.netSalary}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${record.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                      record.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-4">View</button>
                  <button className="text-green-600 hover:text-green-900">Pay</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}