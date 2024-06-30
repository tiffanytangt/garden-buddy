import * as React from 'react';

import { XMarkIcon } from '@heroicons/react/16/solid';
import { getPlants } from '../plants/_actions/getPlants';
import { auth } from '@/lib/auth';
import JournalEntryForm from './_components/JournalEntryForm';
import BackButton from '../(shared)/_components/BackButton';
import { redirect } from 'next/navigation';

export default async function Journal() {
  const session = await auth();
  if (!session) redirect('/');

  const plants = await getPlants(session?.user.id, { sortBy: 'createdAt' });

  return (
    <div className="flex flex-col place-content-center items-center h-full">
      <div className="sm:hidden absolute top-4 right-4">
        <BackButton>
          <XMarkIcon className="size-8" />
        </BackButton>
      </div>
      <JournalEntryForm plants={plants} />
    </div>
  );
}
