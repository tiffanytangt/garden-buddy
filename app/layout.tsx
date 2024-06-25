import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Header from '@/app/(layout)/_components/Header';
import { auth } from '@/lib/auth';

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
        className={`${inter.className} size-full min-h-screen flex sm:pl-20 pt-16 bg-gradient-to-br from-gray-200 to-gray-50 dark:from-gray-950 dark:to-zinc-800`}
      >
        <SessionProvider session={session}>
          <Header />

          <main className="w-full flex flex-col p-2">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
