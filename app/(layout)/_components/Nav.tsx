'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  EllipsisVerticalIcon,
  UserPlusIcon,
  ChevronDownIcon,
} from '@heroicons/react/16/solid';
import { usePathname } from 'next/navigation';
import NavItem from './NavItem';
import { useClickOutside } from '@/app/(shared)/_hooks/clickOutside';
import SlideMenu from '../../(shared)/_components/SlideMenu';
import {
  Calendar,
  Leaf,
  LogIn,
  LogOut,
  NotebookPen,
  Timer,
  Home,
} from 'lucide-react';

interface MenuItem {
  id: number;
  text: string;
  icon: React.ComponentType;
  href: string;
}
const mainItems: MenuItem[] = [
  { id: 1, text: 'Home', icon: Home, href: '/' },
  { id: 2, text: 'Plants', icon: Leaf, href: '/plants' },
  { id: 3, text: 'Calendar', icon: Calendar, href: '/calendar' },
];
const desktopItems: MenuItem[] = [
  { id: 4, text: 'Reminders', icon: Timer, href: '/reminder' },
  { id: 5, text: 'Journal', icon: NotebookPen, href: '/journal' },
];

const getAuthItems = (isLoggedIn: boolean): MenuItem[] => {
  if (!isLoggedIn) {
    return [
      { id: 6, text: 'Sign Up', icon: UserPlusIcon, href: '/sign-up' },
      {
        id: 7,
        text: 'Log In',
        icon: LogIn,
        href: '/api/auth/signin',
      },
    ];
  } else {
    return [
      {
        id: 8,
        text: 'Sign Out',
        icon: LogOut,
        href: '/api/auth/signout',
      },
    ];
  }
};
const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const path = usePathname();
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
            {[...desktopItems, ...getAuthItems(isLoggedIn)].map((props) => {
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
            })}
          </div>
        </div>
      </SlideMenu>
      <nav className="rounded-t-3xl sm:rounded-t-none w-full sm:h-full bg-emerald-900 sm:bg-white sm:dark:bg-zinc-950 sm:text-black sm:dark:text-white text-white sm:p-0 flex flex-col sm:justify-between divide-y divide-gray-100 overflow-hidden">
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
            className="sm:hidden w-1/4"
            ref={menuBtnRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <NavItem
              text="More"
              icon={EllipsisVerticalIcon}
              href=""
              mobile
              className="w-full h-full"
            />
          </div>
        </ul>
        <ul className="hidden text-xs sm:text-md sm:flex sm:flex-col sm:items-center">
          {getAuthItems(isLoggedIn).map((props) => (
            <NavItem key={props.id} {...props} desktop />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
