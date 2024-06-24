import { auth } from '@/lib/auth';
import * as React from 'react';

export default async function Home() {

  const session = await auth();

  return <>hello, {session?.user.username ?? 'guest'}</>;
}
