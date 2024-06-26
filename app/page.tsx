import { auth } from '@/lib/auth';
import * as React from 'react';
import TodGreeting from './(shared)/_components/TodGreeting';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <div className="m-12 text-4xl text-center font-black text-emerald-800">
        <TodGreeting name={session?.user.username ?? undefined} />
      </div>
      <div className="grid grid-cols-1 gap-6 p-4">
        <button className="bg-emerald-600 text-white rounded-lg py-14 text-xl font-extralight">
          Create a Journal Entry
        </button>
        <button className="bg-emerald-700 text-white rounded-lg py-16 text-xl font-extralight">
          Set a Reminder
        </button>
      </div>
    </>
  );
}
