import { auth } from '@/lib/auth';
import * as React from 'react';
import TodGreeting from './(shared)/_components/TodGreeting';



export default async function Home() {
  const session = await auth();

  return (
    <>
    <div className='m-12 text-4xl text-center font-black text-emerald-800'>

      <TodGreeting name={session?.user.username ?? undefined} />
    </div>
    </>
  );
}
