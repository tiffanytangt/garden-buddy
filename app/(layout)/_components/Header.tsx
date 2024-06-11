'use client';

import styles from '../header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import NavMenu from '@/app/(layout)/_components/NavMenu';
import { useRef, useState } from 'react';
import { useClickOutside } from '@/app/_hooks/clickOutside';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    setMenuOpen(false);
  });

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <header className={styles.header}>
        <Link href="/">
          <Image alt="logo" className={styles.logo} src="/logo-32x32.png" width={32} height={32} />
        </Link>
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className={styles.menuLink}
        />
      </header>
      {menuOpen && <NavMenu />}
    </div>
  );
}
