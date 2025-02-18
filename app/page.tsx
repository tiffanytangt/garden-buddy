import { auth } from '@/lib/auth';
import * as React from 'react';
import AuthedHome from './(home)/_components/AuthedHome';
import PublicHome from './(home)/_components/PublicHome';

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col gap-4 h-full">
      {session && <AuthedHome />}
      {!session && <PublicHome />}
    </div>
  );
}
