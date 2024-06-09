'use client';

import styles from '../header.module.css';
import Link from 'next/link';
import NavMenu from '@/app/(layout)/_components/NavMenu';
import { Ref, RefObject, useEffect, useRef, useState } from 'react';

function useClickOutside(ref: RefObject<any>, onClickOutside: () => void) {
  useEffect(() => {
    /**
     * Invoke Function onClick outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }

    // Bind
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // dispose
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClickOutside]);
}

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
          <img className={styles.logo} src="/logo-32x32.png" />
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
