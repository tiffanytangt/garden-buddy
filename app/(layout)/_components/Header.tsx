'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/app/_hooks/clickOutside';
import Menu from './Menu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);
  useClickOutside([menuRef, btnRef], () => setMenuOpen(false));

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
          className={'border-none h-8 w-8'}
          style={{
            backgroundImage:
              'radial-gradient(circle, white 15%, transparent 20%)',
            backgroundSize: '100% 33.33%',
          }}
          ref={btnRef}
        />
      </header>
      <div className="relative">
        <div className="absolute w-48 top-0 right-0 z-10" ref={menuRef}>
          {menuOpen && <Menu />}
        </div>
      </div>
    </>
  );
}
