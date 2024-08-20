import db from '@/lib/db';
import { redirect } from 'next/navigation';
import JournalGallery from './_components/JournalGallery';

export default async function Page({ params }: { params: { slug: string } }) {
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
      <JournalGallery entries={plant.JournalEntries} />
    </div>
  );
}
