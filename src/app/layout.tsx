import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import "./globals.css";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Stock Management System",
  description: "A comprehensive system for managing inventory, sales, and expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-gray-50`}>
        <Sidebar />
        <div className="flex flex-col min-h-screen lg:ml-[220px]">
          <Header />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
