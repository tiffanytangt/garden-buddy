import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Header from '@/app/(layout)/_components/Header';
import { auth } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        className={`${inter.className} flex flex-col items-center sm:ml-20 mt-16 bg-gradient-to-br from-gray-200 to-gray-50 dark:from-gray-950 dark:to-zinc-800`}
      >
        <SessionProvider session={session}>
          <Header />

          <main className="container p-2 min-h-screen">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
