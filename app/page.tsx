import { auth } from '@/lib/auth';
import * as React from 'react';
import TodGreeting from './(shared)/_components/TodGreeting';
import Link from 'next/link';
import Image from 'next/image';
import { NotebookPen, Timer } from 'lucide-react';

export default async function Home() {
  const session = await auth();

  return (
    <div className="h-full flex flex-col justify-center">
      <Image
        alt="logo"
        src="/logo-white-circle-200x200.png"
        width={150}
        height={150}
        className="mx-auto"
      />
      <div className="my-12 text-4xl sm:text-6xl text-center font-black text-emerald-800/70 dark:text-stone-300/50 opacity-80">
        <TodGreeting name={session?.user.username ?? undefined} />
      </div>
      {session && (
        <div className="flex flex-col items-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full sm:max-w-sm gap-6 px-16 text-white font-extralight">
            <Link
              href="/journal"
              className="bg-emerald-600 rounded-full sm:rounded-3xl py-4 sm:py-6 flex flex-col items-center gap-1"
            >
              <NotebookPen size={32} className="mt-1" />
              <button>Journal Entry</button>
            </Link>
            <Link
              href="/reminders"
              className="bg-emerald-700 rounded-full sm:rounded-3xl py-4 sm:py-6 flex flex-col items-center gap-1"
            >
              <Timer size={32} className="mt-1" />
              <button>Reminder</button>
            </Link>
          </div>
        </div>
      )}
      {!session && (
        <div className="flex flex-col items-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full sm:max-w-sm gap-6 p-4">
            <Link
              href="/api/auth/signin"
              className="bg-emerald-600 text-white rounded-lg py-7 text-xl font-extralight text-center"
            >
              <button>Login</button>
            </Link>
            <Link
              href="/sign-up"
              className="bg-emerald-700 text-white rounded-lg py-7 text-xl font-extralight text-center"
            >
              Signup
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
