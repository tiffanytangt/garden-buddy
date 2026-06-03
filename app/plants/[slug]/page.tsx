import db from '@/lib/db';
import { redirect } from 'next/navigation';
import JournalGallery from './_components/JournalGallery';
import { Button } from '@/app/(shared)/_components/Button';
import { NotebookPen } from 'lucide-react';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { newEntry?: string };
}) {
  if (!isNaN(+params.slug)) {
    const plant = await db.plant.findFirst({
      where: {
        id: +params.slug,
      },
    });
    redirect('/plants/' + plant?.slug);
  }

  const plant = await db.plant.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      journalEntries: {
        include: { journalEntryPhotos: { include: { photo: true } } },
        orderBy: { entryDate: 'desc' },
      },
    },
  });

  if (!plant) redirect('/plants');
  return (
    <div className="flex flex-col gap-4 py-6 container mx-auto max-w-lg">
      <div className="text-center font-extralight">
        <h1 className="text-xl sm:text-3xl">{plant.displayName}</h1>(
        {plant.slug})
      </div>
      <div className="flex justify-center">
        <Button variant="primary" href={`/journal?plant=${plant.slug}`}>
          <NotebookPen className="inline mr-1 -ml-1 size-5" />
          <span>Add Journal Entry</span>
        </Button>
      </div>
      {plant.journalEntries.length === 0 ? (
        <p className="text-center font-extralight py-6">
          No journal entries yet. Add your first one above.
        </p>
      ) : (
        <JournalGallery
          entries={plant.journalEntries}
          highlightEntryId={
            searchParams.newEntry ? +searchParams.newEntry : undefined
          }
        />
      )}
    </div>
  );
}
