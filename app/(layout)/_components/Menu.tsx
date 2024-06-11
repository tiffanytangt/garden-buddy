'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Menu() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-stretch bg-white p-4 space-y-2">
      {session && (
        <>
          <p className="text-sm">Hello, {session.user?.username}</p>
          <hr className="border-gray-200 my-2" />
          <Link href="/api/auth/signout">Logout</Link>
        </>
      )}

      {!session && (
        <>
          <Link href="/api/auth/signin">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </>
      )}
    </div>
  );
}
