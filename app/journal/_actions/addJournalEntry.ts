'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { resizeImage } from '@/lib/resize';
import { uploadImageToS3 } from '@/lib/s3';

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
                      await resizeImage(photo, 1200)
                    ),
                  },
                },
              }))
          ),
        },
      },
    });
  try {
    return await insert();
  } catch (e: unknown) {
    throw e;
  }
}
