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
      {plant.JournalEntries.map((journalEntry) => (
        <div
          key={`journal-entry-${journalEntry.id}`}
          className="bg-white dark:bg-opacity-25 p-2 rounded-md"
        >
          <div className="flex gap-2 items-end justify-center">
            {journalEntry.JournalEntryPhotos.map((journalEntryPhoto) => (
              <Image
                width={100}
                height={100}
                className="size-36"
                key={`journal-entry-photo-${journalEntryPhoto.photoId}`}
                src={journalEntryPhoto.Photo.location}
                alt={`Photo on ${journalEntry.entryDate}`}
              />
            ))}
          </div>
          <div className="italic">{journalEntry.description}</div>
          <div className="text-sm mt-1">
            {journalEntry.entryDate.toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
