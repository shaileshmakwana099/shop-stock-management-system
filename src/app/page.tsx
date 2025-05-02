'use client';
import Image from "next/image";
import { useState } from 'react';
import Dashboard from "./dashboard/page";

export default function Home() {
  const [summaryData] = useState({
    totalStock: 150,
    totalSales: 25000,
    totalExpenses: 15000,
    profit: 10000,
    lowStockItems: 5
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Dashboard />
    </div>
  );
}
