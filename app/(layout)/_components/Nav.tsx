'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  EllipsisVerticalIcon,
  BellAlertIcon,
  HomeIcon,
  Squares2X2Icon,
  CalendarDaysIcon,
  BookOpenIcon,
  ArrowRightEndOnRectangleIcon,
  ArrowLeftEndOnRectangleIcon,
  UserPlusIcon,
  ChevronDownIcon,
} from '@heroicons/react/16/solid';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import NavItem from './NavItem';
import { useClickOutside } from '@/app/(shared)/_hooks/clickOutside';
import SlideMenu from '../../(shared)/_components/SlideMenu';

interface MenuItem {
  id: number;
  text: string;
  icon: React.ComponentType;
  href: string;
}
const mainItems: MenuItem[] = [
  { id: 2, text: 'Home', icon: HomeIcon, href: '/' },
  { id: 2, text: 'Plants', icon: Squares2X2Icon, href: '/plants' },
  { id: 3, text: 'Calendar', icon: CalendarDaysIcon, href: '/calendar' },
];
const desktopItems: MenuItem[] = [
  { id: 4, text: 'Reminders', icon: BellAlertIcon, href: '/schedule' },
  { id: 5, text: 'Journal', icon: BookOpenIcon, href: '/journal' },
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
const NavBar = () => {
  const path = usePathname();
  const { data: session } = useSession();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLDivElement>(null);
  useClickOutside([menuRef, menuBtnRef], () => setIsMenuOpen(false));

  return (
    <>
      <SlideMenu isOpen={isMenuOpen} slideDirection="up">
        <div
          ref={menuRef}
          className="absolute right-0 bottom-0 w-full flex flex-col items-center
          border-y border-gray-300 dark:border-gray-700 bg-white dark:bg-black divide-y divide-gray-200 dark:divide-gray-800"
        >
          <ChevronDownIcon
            className="h-8 w-full text-emerald-700 dark:text-emerald-400 my-1"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="w-full flex flex-col gap-6 p-5 ">
            {[...desktopItems, ...getAuthItems(!!session?.user)].map(
              (props) => {
                const IconComponent = props.icon as React.ComponentType<{
                  className: string;
                }>;
                return (
                  <li key={props.id} className="flex items-center w-full gap-1">
                    <IconComponent className="size-6" />
                    <Link href={props.href} passHref>
                      {props.text}
                    </Link>
                  </li>
                );
              }
            )}
          </div>
        </div>
      </SlideMenu>
      <nav className="w-full sm:h-full bg-white dark:bg-black dark:text-white sm:p-0 flex flex-col sm:justify-between divide-y divide-gray-100">
        <ul className="text-xs sm:text-md flex sm:flex-col sm:items-center">
          {mainItems.map((props) => (
            <NavItem
              key={props.id}
              {...props}
              isActive={path == props.href}
              desktop
              mobile
            />
          ))}
          {desktopItems.map((props) => (
            <NavItem
              key={props.id}
              {...props}
              isActive={path == props.href}
              desktop
            />
          ))}
          <div
            className="sm:flex w-full"
            ref={menuBtnRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <NavItem text="More" icon={EllipsisVerticalIcon} href="" mobile />
          </div>
        </ul>
        <ul className="hidden text-xs sm:text-md sm:flex sm:flex-col sm:items-center">
          {getAuthItems(!!session?.user).map((props) => (
            <NavItem key={props.id} {...props} desktop />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
