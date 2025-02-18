'use server';
import TodGreeting from '@/app/(shared)/_components/TodGreeting';
import { auth } from '@/lib/auth';
import db from '@/lib/db';
import Image from 'next/image';
import Link from 'next/link';

export default async function PublicHome() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Image
        alt="logo"
        src="/logo-white-circle-200x200.png"
        width={150}
        height={150}
        className="mx-auto"
      />
      <div className="my-12 text-4xl sm:text-6xl text-center font-black text-emerald-800/70 dark:text-stone-300/50 opacity-80">
        <TodGreeting />
      </div>
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
  );
}
