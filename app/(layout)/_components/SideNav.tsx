import React from 'react';
import Link from 'next/link';
import { BellAlertIcon, HomeIcon, Squares2X2Icon, CalendarDaysIcon } from '@heroicons/react/16/solid';

const SideNav = () => {
  const upperEntries = [
    { id: 1, text: "Home", icon: HomeIcon, href: "/" },
    { id: 1, text: "Plants", icon: Squares2X2Icon, href: "/plants" },
    { id: 2, text: "Calendar", icon: CalendarDaysIcon, href: "/calendar" },
    { id: 2, text: "Reminders", icon: BellAlertIcon, href: "/schedule" },
  ];

  return (
    <nav className='h-full bg-white dark:bg-black dark:text-white pl-3 pr-16 sm:p-0'>
      <ul className='text-xs sm:text-md flex flex-col sm:items-center'>
        {upperEntries.map((entry) => {
          const IconComponent = entry.icon;
          return (
            <li key={entry.id} className='w-full flex items-center gap-1 px-1 py-4 active:bg-gray-500 active:text-black'>
              <Link href={entry.href} className='w-full flex sm:flex-col items-center gap-1'>
                <IconComponent className='size-6'/>
                <span className='text-base sm:text-xs'>{entry.text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNav;
