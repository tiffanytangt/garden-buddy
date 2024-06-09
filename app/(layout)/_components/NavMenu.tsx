'use client';

import styles from '../header.module.css';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function NavMenu() {
  const { data: session } = useSession();

  return (
    <nav>
      <div className={styles.menu}>
        {session && (
          <>
            <p className={styles.greeting}>Hello, {session.user?.username}</p>
            <div className={styles.menuItem}>
              <Link href="/api/auth/signout">Logout</Link>
            </div>
          </>
        )}

        {!session && (
          <>
            <div className={styles.menuItem}>
              <Link href="/api/auth/signin">Sign In</Link>
            </div>
            <div className={styles.menuItem}>
              <Link href="/sign-up">Sign Up</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
