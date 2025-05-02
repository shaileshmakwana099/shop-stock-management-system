'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface InventoryFormProps {
  params: {
    action: string;
  };
  searchParams: {
    id?: string;
  };
}

export default function InventoryForm({ params, searchParams }: InventoryFormProps) {
  const router = useRouter();
  const isEdit = params.action === 'edit';
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [suppliers, setSuppliers] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    stockCount: 0,
    minThreshold: 10,
    costPrice: 0,
    salePrice: 0,
    arrivalDate: new Date().toISOString().split('T')[0],
    supplierId: ''
  });

  useEffect(() => {
    fetchSuppliers();
    if (isEdit && searchParams.id) {
      fetchItem(searchParams.id);
    }
  }, [isEdit, searchParams.id]);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers');
      if (!response.ok) throw new Error('Failed to fetch suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (err) {
      setError('Failed to load suppliers');
    }
  };

  const fetchItem = async (id: string) => {
    try {
      const response = await fetch(`/api/inventory/${id}`);
      if (!response.ok) throw new Error('Failed to fetch item');
      const data = await response.json();
      setFormData({
        name: data.name,
        stockCount: data.stockCount,
        minThreshold: data.minThreshold,
        costPrice: data.costPrice,
        salePrice: data.salePrice,
        arrivalDate: new Date(data.arrivalDate).toISOString().split('T')[0],
        supplierId: data.supplierId
      });
    } catch (err) {
      setError('Failed to load item details');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const url = isEdit ? `/api/inventory/${searchParams.id}` : '/api/inventory';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save item');
      router.push('/inventory');
    } catch (err) {
      setError('Failed to save item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['stockCount', 'minThreshold', 'costPrice', 'salePrice'].includes(name)
        ? parseFloat(value)
        : value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {isEdit ? 'Edit Item' : 'Add New Item'}
        </h1>

        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Count</label>
              <input
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Min Threshold</label>
              <input
                type="number"
                name="minThreshold"
                value={formData.minThreshold}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cost Price</label>
              <input
                type="number"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sale Price</label>
              <input
                type="number"
                name="salePrice"
                value={formData.salePrice}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Arrival Date</label>
            <input
              type="date"
              name="arrivalDate"
              value={formData.arrivalDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Supplier</label>
            <select
              name="supplierId"
              value={formData.supplierId}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select a supplier</option>
              {suppliers.map((supplier: any) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => router.push('/inventory')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}