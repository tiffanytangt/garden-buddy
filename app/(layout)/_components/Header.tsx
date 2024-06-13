'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/app/_hooks/clickOutside';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import SideNav from './SideNav';

export default function Header({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  useClickOutside([menuRef, btnRef], () => setMenuOpen(false));
  const { data: session } = useSession();

  return (
    <>
      <header className="flex items-center justify-between bg-emerald-600 dark:bg-gradient-to-br dark:from-emerald-950 dark:to-emerald-900 p-2">
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
      {/* Wraps nav and main content */}
      <div className="flex flex-row-reverse sm:flex-row">
        {session?.user && (
          <div
            ref={menuRef}
            className={`sm:flex sm:static ${!menuOpen && 'hidden'} absolute sm:h-auto z-10`}
          >
            <SideNav />
          </div>
        )}
        {children}
      </div>
    </>
  );
}
