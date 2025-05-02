'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AddItemModal from '@/components/inventory/AddItemModal';

interface Item {
  id: string;
  name: string;
  stockCount: number;
  lowStockAlert: number;
  costPrice: number;
  salePrice: number;
  arrivalDate: string;
  supplier: {
    id: string;
    name: string;
  };
  purchases: {
    id: string;
    paidAmount: number;
    totalCost: number;
    isPaid: boolean;
  }[];
}

export default function Inventory() {
  const router = useRouter();
  const [items] = useState<Item[]>([
    {
      id: '1',
      name: 'Sample Item',
      stockCount: 50,
      lowStockAlert: 10,
      costPrice: 100,
      salePrice: 150,
      arrivalDate: '2024-01-20',
      supplier: {
        id: '1',
        name: 'Sample Supplier'
      },
      purchases: [
        {
          id: '1',
          paidAmount: 0,
          totalCost: 100,
          isPaid: false
        }
      ]
    },
    {
      id: '2',
      name: 'Electronics',
      stockCount: 5,
      lowStockAlert: 8,
      costPrice: 200,
      salePrice: 300,
      arrivalDate: '2024-01-15',
      supplier: {
        id: '2',
        name: 'Tech Suppliers'
      },
      purchases: [
        {
          id: '2',
          paidAmount: 150,
          totalCost: 200,
          isPaid: false
        }
      ]
    },
    {
      id: '3',
      name: 'Office Supplies',
      stockCount: 100,
      lowStockAlert: 20,
      costPrice: 50,
      salePrice: 75,
      arrivalDate: '2024-01-25',
      supplier: {
        id: '3',
        name: 'Office Depot'
      },
      purchases: [
        {
          id: '3',
          paidAmount: 50,
          totalCost: 50,
          isPaid: true
        }
      ]
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddItem = () => {
    // Refresh the items list after adding a new item
    // In a real application, this would fetch the updated data from the API
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Item
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sale Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => {
                const latestPurchase = item.purchases[item.purchases.length - 1];
                const isLowStock = item.stockCount <= item.lowStockAlert;
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.stockCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {isLowStock ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.costPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.salePrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(item.arrivalDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.supplier.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {latestPurchase && (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${latestPurchase.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {latestPurchase.isPaid ? 'Paid' : `Pending - $${latestPurchase.totalCost - latestPurchase.paidAmount}`}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => router.push(`/inventory/${item.id}/edit`)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onItemAdded={handleAddItem}
      />
    </div>
  );
}