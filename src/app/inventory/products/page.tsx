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

// Add this function at the top of your component
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB'); // Using en-GB for DD/MM/YYYY format
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Item | ''>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);

  const handleSort = (field: keyof Item) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddItem = () => {
    // Refresh the items list after adding a new item
    router.refresh();
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' 
        ? aValue - bValue
        : bValue - aValue;
    }

    return 0;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(currentItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleBulkDelete = () => {
    // Add your delete logic here
    console.log('Deleting items:', selectedItems);
    setSelectedItems([]);
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
        <div className="p-4 flex items-center gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by item name or supplier name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortField}
              onChange={(e) => {
                setSortField(e.target.value as keyof Item);
                setSortDirection('asc');
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Sort by</option>
              <option value="name">Name</option>
              <option value="stockCount">Stock Count</option>
              <option value="costPrice">Cost Price</option>
              <option value="salePrice">Sale Price</option>
              <option value="arrivalDate">Arrival Date</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          {selectedItems.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {selectedItems.length} items selected
                </span>
                <button
                  onClick={handleBulkDelete}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Delete Selected
                </button>
              </div>
            </div>
          )}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4">
                  <input
                    type="checkbox"
                    checked={currentItems.length > 0 && selectedItems.length === currentItems.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                  />
                </th>
                <th onClick={() => handleSort('name')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Name {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  onClick={() => handleSort('stockCount')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Stock Count {sortField === 'stockCount' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th 
                  onClick={() => handleSort('costPrice')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Cost Price {sortField === 'costPrice' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  onClick={() => handleSort('salePrice')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Sale Price {sortField === 'salePrice' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th 
                  onClick={() => handleSort('arrivalDate')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Arrival Date {sortField === 'arrivalDate' && (sortDirection === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((item) => {
                const latestPurchase = item.purchases[item.purchases.length - 1];
                const isLowStock = item.stockCount <= item.lowStockAlert;
                return (
                  <tr key={item.id} className={selectedItems.includes(item.id) ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap w-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleSelectItem(item.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                      />
                    </td>
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
                      {formatDate(item.arrivalDate)}
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
            
            {/* Add pagination controls */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, sortedItems.length)}
                    </span>{' '}
                    of <span className="font-medium">{sortedItems.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === index + 1
                            ? 'z-10 bg-indigo-500 border-indigo-500 text-white'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
          
          {/* ... existing modal ... */}
        </div>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onItemAdded={handleAddItem}
      />
    </div>
  );
}