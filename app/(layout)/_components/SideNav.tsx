'use client';

import React from 'react';
import Link from 'next/link';
import {
  BellAlertIcon,
  HomeIcon,
  Squares2X2Icon,
  CalendarDaysIcon,
  BookOpenIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  UserPlusIcon,
} from '@heroicons/react/16/solid';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

interface MenuItem {
  id: number;
  text: string;
  icon: React.ComponentType;
  href: string;
}
const mainItems: MenuItem[] = [
  { id: 1, text: 'Home', icon: HomeIcon, href: '/' },
  { id: 2, text: 'Plants', icon: Squares2X2Icon, href: '/plants' },
  { id: 3, text: 'Calendar', icon: CalendarDaysIcon, href: '/calendar' },
  { id: 4, text: 'Reminders', icon: BellAlertIcon, href: '/schedule' },
  { id: 5, text: 'Journal', icon: BookOpenIcon, href: '/schedule' },
];

const getAuthItems = (isLoggedIn: boolean): MenuItem[] => {
  if (!isLoggedIn) {
    return [
      { id: 6, text: 'Sign Up', icon: UserPlusIcon, href: '/sign-up' },
      {
        id: 7,
        text: 'Log In',
        icon: ArrowRightEndOnRectangleIcon,
        href: '/api/auth/signin',
      },
    ];
  } else {
    return [
      {
        id: 6,
        text: 'Sign Out',
        icon: ArrowLeftEndOnRectangleIcon,
        href: '/api/auth/signout',
      },
    ];
  }
};
const SideNav = () => {
  const path = usePathname();

  const { data: session } = useSession();

  return (
    <nav className="w-full h-full bg-white dark:bg-black dark:text-white sm:p-0 sm:flex sm:flex-col sm:justify-between">
      <ul className="text-xs sm:text-md flex flex-col sm:items-center">
        {mainItems.map((props) => (
          <SideNavItem
            key={props.id}
            {...props}
            isActive={path == props.href}
          />
        ))}
      </ul>
      <ul className="text-xs sm:text-md flex flex-col sm:items-center">
        {getAuthItems(!!session?.user).map((props) => (
          <SideNavItem key={props.id} {...props} />
        ))}
      </ul>
    </nav>
  );
};

interface SideNavItemProps {
  id: number;
  text: string;
  icon: React.ComponentType;
  href: string;
  isActive?: boolean;
}
const SideNavItem = ({ icon, id, href, text, isActive }: SideNavItemProps) => {
  const IconComponent = icon as React.ComponentType<{ className: string }>;
  return (
    <li
      key={id}
      className={`w-full flex items-center gap-1 sm:px-1 py-4 active:bg-gray-500 active:text-black pl-3 pr-16 
        ${isActive ? 'text-emerald-700 dark:text-emerald-400' : ''} `}
    >
      <Link href={href} className="w-full flex sm:flex-col items-center gap-1">
        <IconComponent className="size-6" />
        <span className="text-base sm:text-xs">{text}</span>
      </Link>
    </li>
  );
};

export default SideNav;
