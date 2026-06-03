import * as React from 'react';

import { XMarkIcon } from '@heroicons/react/16/solid';
import { getPlants } from '../plants/_actions/getPlants';
import { auth } from '@/lib/auth';
import JournalEntryForm from './_components/JournalEntryForm';
import BackButton from '../(shared)/_components/BackButton';
import { redirect } from 'next/navigation';

export default async function Journal({
  searchParams,
}: {
  searchParams: { plant?: string };
}) {
  const session = await auth();
  if (!session) redirect('/');

  const plants = await getPlants(session?.user.id, { sortBy: 'createdAt' });

  // When arriving from a plant's page (?plant=<slug>), pre-select and lock that
  // plant. Fall back to the normal editable form if the slug isn't owned/valid.
  const preselected = searchParams.plant
    ? plants.find((plant) => plant.slug === searchParams.plant)
    : undefined;

  return (
    <div className="flex flex-col place-content-center items-center h-full">
      <div className="sm:hidden absolute top-4 right-4">
        <BackButton>
          <XMarkIcon className="size-8" />
        </BackButton>
      </div>
      <JournalEntryForm
        plants={plants}
        preselectedPlantId={preselected?.id}
        locked={!!preselected}
      />
    </div>
  );
}
