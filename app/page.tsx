import { auth } from '@/lib/auth';
import * as React from 'react';
import TodGreeting from './(shared)/_components/TodGreeting';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <div className="m-12 text-4xl sm:text-6xl text-center font-black text-emerald-800 dark:text-warmGray-50 opacity-80">
        <TodGreeting name={session?.user.username ?? undefined} />
      </div>
      <div className="flex flex-col items-center ">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full sm:max-w-sm gap-6 p-4">
          <button className="bg-emerald-600 text-white rounded-lg py-14 text-xl font-extralight">
            Create a Journal Entry
          </button>
          <button className="bg-emerald-700 text-white rounded-lg py-16 text-xl font-extralight">
            Set a Reminder
          </button>
        </div>
      </div>
    </>
  );
}
