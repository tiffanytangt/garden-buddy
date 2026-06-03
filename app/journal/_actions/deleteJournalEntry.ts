'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteJournalEntry(id: number) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  // Scope by owner so a user can only delete their own entries. The related
  // journalEntryPhotos cascade via the schema; the S3 objects are left for the
  // same cleanup TODO as plant/photo deletion.
  const entry = await db.journalEntry.delete({
    where: { id, ownerId: session.user.id },
    include: { plant: { select: { slug: true } } },
  });

  if (entry.plant?.slug) revalidatePath('/plants/' + entry.plant.slug);
}
