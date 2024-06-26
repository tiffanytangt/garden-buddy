import { auth } from '@/lib/auth';
import * as React from 'react';

  const getTimeOfDay = (): string => {
    'use client';
    const now = new Date();
    const hour = now.getHours();
    if (hour < 12) {
      return 'morning';
    } else if (hour < 17) {
      return 'afternoon';
    } else {
      return 'evening';
    }
  };

export default async function Home() {
  const session = await auth();

  return (
    <>
    <div className='m-12 text-4xl text-center font-black text-emerald-800'>

      Good {getTimeOfDay()}, {session?.user.username ?? 'guest'}
    </div>
    </>
  );
}
