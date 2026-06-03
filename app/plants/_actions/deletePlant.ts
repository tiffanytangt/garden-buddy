'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { deleteImageFromS3 } from '@/lib/s3';
import { revalidatePath } from 'next/cache';

export async function deletePlant(plantId: number) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const plant = await db.plant.findFirst({
    where: { id: plantId, userId: session.user.id },
    include: {
      photo: true,
      journalEntries: {
        include: { journalEntryPhotos: { include: { photo: true } } },
      },
    },
  });
  if (!plant) throw new Error('Plant not found');

  // The plant's own photo plus every photo attached to its journal entries.
  const photos = [
    ...(plant.photo ? [plant.photo] : []),
    ...plant.journalEntries.flatMap((entry) =>
      entry.journalEntryPhotos.map((jep) => jep.photo)
    ),
  ];

  // Deleting the plant cascades its journal entries and journalEntryPhotos, but
  // leaves the Photo rows and S3 objects orphaned — clean those up afterwards.
  await db.plant.delete({ where: { id: plant.id } });

  if (photos.length) {
    await db.photo.deleteMany({
      where: { id: { in: photos.map((p) => p.id) } },
    });
    // Best-effort: a failed S3 delete shouldn't fail the whole operation.
    await Promise.allSettled(photos.map((p) => deleteImageFromS3(p.location)));
  }

  revalidatePath('/plants');
  revalidatePath('/');
}
