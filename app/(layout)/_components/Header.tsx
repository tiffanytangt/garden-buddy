'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavBar from './Nav';

export default function Header() {
  return (
    <>
      <header
        className="hidden fixed h-16 w-full top-0 left-0 sm:flex items-center justify-between 
      bg-emerald-600 dark:bg-gradient-to-br dark:from-emerald-950 dark:to-emerald-900 px-2 z-20"
      >
        <Link href="/">
          <Image
            alt="logo"
            className="bg-white aspect-square w-12 h-12 rounded-full p-1"
            src="/logo-32x32.png"
            width={32}
            height={32}
          />
        </Link>
      </header>
      <div className="w-full sm:w-20 z-10 fixed right-0 sm:right-auto sm:left-0 sm:top-0 bottom-0 sm:flex xs:absolute sm:mt-16">
        <NavBar />
      </div>
    </>
  );
}
