'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { deleteImageFromS3 } from '@/lib/s3';
import { revalidatePath } from 'next/cache';

export async function deleteJournalEntry(id: number) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  // Scope by owner so a user can only delete their own entries.
  const entry = await db.journalEntry.findFirst({
    where: { id, ownerId: session.user.id },
    include: {
      plant: { select: { slug: true } },
      journalEntryPhotos: { include: { photo: true } },
    },
  });
  if (!entry) throw new Error('Journal entry not found');

  const photos = entry.journalEntryPhotos.map((jep) => jep.photo);

  // Deleting the entry cascades its journalEntryPhotos, but leaves the Photo
  // rows and S3 objects orphaned — clean those up afterwards.
  await db.journalEntry.delete({ where: { id: entry.id } });

  if (photos.length) {
    await db.photo.deleteMany({
      where: { id: { in: photos.map((p) => p.id) } },
    });
    // Best-effort: a failed S3 delete shouldn't fail the whole operation.
    await Promise.allSettled(photos.map((p) => deleteImageFromS3(p.location)));
  }

  if (entry.plant?.slug) revalidatePath('/plants/' + entry.plant.slug);
}
