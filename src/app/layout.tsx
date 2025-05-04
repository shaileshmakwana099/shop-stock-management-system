'use client';

import { Metadata } from "next";
import { Poppins } from 'next/font/google';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import "./globals.css";
import Footer from "@/components/layout/Footer";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

const metadata: Metadata = { 
  title: "Stock Management System",
  description: "A comprehensive system for managing inventory, sales, and expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    setIsAuthenticated(!!isLoggedIn);
  }, []);

  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-gray-50`}>
        {!isLoginPage && isAuthenticated && <Sidebar />}
        <div className={`flex flex-col min-h-screen ${!isLoginPage && isAuthenticated ? 'lg:ml-[220px]' : ''}`}>
          {!isLoginPage && isAuthenticated && <Header />}
          <main className="flex-1 p-6">
            {children}
          </main>
          {!isLoginPage && isAuthenticated && <Footer />}
        </div>
      </body>
    </html>
  );
}
