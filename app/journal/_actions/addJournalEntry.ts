'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { resizeImage } from '@/lib/resize';
import { uploadImageToS3 } from '@/lib/s3';
import { revalidatePath } from 'next/cache';

export async function addJournalEntry(formData: FormData) {
  'use server';

  const session = await auth();
  const plantId = formData.get('plantId') as string;
  const description = formData.get('description') as string;
  const timestamp = formData.get('timestamp') as string;
  const photos = formData.getAll('photos') as File[];

  if (!plantId || !session?.user) return;

  const insert = async () =>
    db.journalEntry.create({
      data: {
        plantId: +plantId,
        ownerId: session.user.id,
        description,
        entryDate: new Date(timestamp),
        journalEntryPhotos: {
          create: await Promise.all(
            photos
              .filter((f) => f.size > 0)
              .map(async (photo) => ({
                photo: {
                  create: {
                    location: await uploadImageToS3(
                      await resizeImage(photo, 1600)
                    ),
                  },
                },
              }))
          ),
        },
      },
      include: { plant: { select: { slug: true } } },
    });
  try {
    const entry = await insert();
    // Bust the plant page cache so the new entry shows up immediately
    if (entry.plant?.slug) revalidatePath('/plants/' + entry.plant.slug);
    return entry;
  } catch (e: unknown) {
    throw e;
  }
}
