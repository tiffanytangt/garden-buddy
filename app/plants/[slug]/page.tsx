import db from '@/lib/db';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
  if (!isNaN(+params.slug)) {
    const plant = await db.plant.findFirstOrThrow({
      where: {
        id: +params.slug,
      },
    });
    redirect('/plants/' + plant.slug);
  }

  const plant = await db.plant.findFirstOrThrow({
    where: {
      slug: params.slug,
    },
    include: {
      JournalEntries: {
        include: { JournalEntryPhotos: { include: { Photo: true } } },
      },
    },
  });

  if (!plant) redirect('/plants');
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-xl">
        {plant.displayName} ({plant.slug})
      </h1>
      {plant.JournalEntries.map((journalEntry) => (
        <div
          key={`journal-entry-${journalEntry.id}`}
          className="bg-white dark:bg-opacity-50 p-4 rounded-md"
        >
          <div className="text-sm font-bold">
            {journalEntry.entryDate.toDateString()}
          </div>
          <div className="flex gap-2">
            {journalEntry.JournalEntryPhotos.map((journalEntryPhoto) => (
              <Image
                width={100}
                height={100}
                className="size-36"
                key={`journal-entry-photo-${journalEntryPhoto.id}`}
                src={journalEntryPhoto.Photo.location}
                alt={`Photo of ${journalEntry.entryDate}`}
              />
            ))}
          </div>
          <div className=" italic">{journalEntry.description}</div>
        </div>
      ))}
    </div>
  );
}
