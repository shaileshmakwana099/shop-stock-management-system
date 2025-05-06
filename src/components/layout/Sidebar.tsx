'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

const Sidebar = () => {
  const pathname = usePathname(); 
  const router = useRouter();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleSubmenu = (href: string) => {
    setExpandedMenus(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  };

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      // Clear any local storage items if needed
      localStorage.clear();
      // Redirect to login page
      router.push('/login');
      router.refresh();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '/svg/home.svg' },
    {
      name: 'Inventory',
      href: '/inventory',
      icon: '/svg/orders.svg',
      subItems: [
        { name: 'Products', href: '/inventory/products' },
        { name: 'Low Stocks', href: '/inventory/low-stocks' },
        { name: 'Category', href: '/inventory/category' },
      ],
    },
    { name: 'Purchases', href: '/purchases', icon: '/svg/claims.svg' },
    { name: 'Sales', href: '/sales', icon: '/svg/claims.svg' },
    { name: 'Suppliers', href: '/suppliers', icon: '/svg/suppliers.svg' },
    { name: 'Expenses', href: '/expenses', icon: '/svg/pricing.svg' },
    {
      name: 'Payroll',
      href: '/payroll',
      icon: '/svg/payments.svg',
      subItems: [
        { name: 'Employees', href: '/payroll/employee' },
        { name: 'Employee Salary', href: '/payroll/salary' },
      ],
    },
    { name: 'Notifications', href: '/notifications', icon: '/svg/notification.svg' },
  ];

  return (
    <aside className="min-w-[220px] bg-gray-900 text-white h-screen fixed left-0 top-0 z-40 lg:block hidden">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Stock Manager</h1>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <div 
                className={`flex items-center px-4 py-2 text-sm cursor-pointer ${
                  pathname === item.href
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
                onClick={() => item.subItems && toggleSubmenu(item.href)}
              >
                <Link
                  href={item.href}
                  className="flex items-center flex-1"
                  onClick={(e) => item.subItems && e.preventDefault()}
                >
                  <Image src={item.icon} alt="" width={20} height={20} className="mr-2" />
                  {item.name}
                </Link>
                {item.subItems && (
                  <Image 
                    src="/svg/down-arrow.svg"
                    alt="toggle menu" 
                    width={12} 
                    height={12}
                    className={`transform transition-transform duration-200 ${
                      expandedMenus.includes(item.href) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </div>
              {item.subItems && (
                <ul className={`ml-7 mt-1 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedMenus.includes(item.href)
                    ? 'max-h-48 opacity-100'
                    : 'max-h-0 opacity-0'
                }`}>
                  {item.subItems.map((subItem) => (
                    <li key={subItem.href}>
                      <Link
                        href={subItem.href}
                        className={`block px-4 py-1.5 text-sm ${
                          pathname === subItem.href
                            ? 'text-white bg-gray-800'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800'
                        }`}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <button
          className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;