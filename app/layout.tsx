import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Header from '@/app/(layout)/_components/Header';
import { auth } from '@/lib/auth';
import NavBar from './(layout)/_components/Nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Garden Buddy',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <title>Garden Buddy</title>
        <link rel="icon" href="/app/icon.ico" sizes="any" />
      </head>
      <body
        className={`${inter.className} size-full min-h-screen flex sm:pl-20 sm:pt-16 ${session ? 'pb-20' : ''} bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-950 dark:to-zinc-800  dark:text-white`}
      >
        <SessionProvider session={session}>
          <Header />

          {session && (
            <div className="w-full sm:w-20 z-10 fixed right-0 sm:right-auto sm:left-0 sm:top-0 bottom-0 sm:flex xs:absolute sm:mt-16">
              <NavBar />
            </div>
          )}

          <main className="w-full flex flex-col p-2 justify-center">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
