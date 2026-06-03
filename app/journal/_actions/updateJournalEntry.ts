'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateJournalEntry(id: number, formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  const description = formData.get('description') as string;
  const timestamp = formData.get('timestamp') as string;

  const entry = await db.journalEntry.update({
    where: { id, ownerId: session.user.id },
    data: { description, entryDate: new Date(timestamp) },
    include: { plant: { select: { slug: true } } },
  });

  if (entry.plant?.slug) revalidatePath('/plants/' + entry.plant.slug);
}
