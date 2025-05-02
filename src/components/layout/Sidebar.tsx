'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: '/svg/home.svg' },
    { name: 'Inventory', href: '/inventory', icon: '/svg/orders.svg' },
    { name: 'Sales', href: '/sales', icon: '/svg/claims.svg' },
    { name: 'Suppliers', href: '/suppliers', icon: '/svg/suppliers.svg' },
    { name: 'Expenses', href: '/expenses', icon: '/svg/pricing.svg' },
    { name: 'Finance', href: '/reports', icon: '/svg/payments.svg' },
    { name: 'Reports', href: '/reports', icon: '/svg/inventory.svg' },
  ];

  return (
    <aside className="min-w-[220px] bg-gray-900 text-white h-screen fixed left-0 top-0 z-40 lg:block hidden">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">Stock Manager</h1>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm ${pathname === item.href
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                <Image src={item.icon} alt="" width={20} height={20} className="mr-2" />
                {item.name}
              </Link>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full p-4 border-t border-gray-800">
        <button
          className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded"
          onClick={() => console.log('Logout clicked')}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;