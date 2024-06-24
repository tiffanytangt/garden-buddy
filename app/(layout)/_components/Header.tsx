'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/app/_hooks/clickOutside';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import SideNav from './SideNav';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  useClickOutside([menuRef, btnRef], () => setMenuOpen(false));
  const path = usePathname();

  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <>
      <header className="fixed h-16 w-full top-0 left-0 flex items-center justify-between bg-emerald-600 dark:bg-gradient-to-br dark:from-emerald-950 dark:to-emerald-900 px-2 z-20">
        <Link href="/">
          <Image
            alt="logo"
            className="bg-white aspect-square w-12 h-12 rounded-full p-1"
            src="/logo-32x32.png"
            width={32}
            height={32}
          />
        </Link>

        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden"
          ref={btnRef}
        >
          <EllipsisVerticalIcon className="size-9 text-white" />
        </div>
      </header>
      <div
        ref={menuRef}
        className={`sm:w-20 z-10 fixed right-0 sm:right-auto sm:left-0 top-0 sm:bottom-0 sm:flex ${!menuOpen && 'hidden'} xs:absolute mt-16`}
      >
        <SideNav />
      </div>
    </>
  );
}
