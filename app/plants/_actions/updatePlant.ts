'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { resizeImage } from '@/lib/resize';
import { uploadImageToS3 } from '@/lib/s3';
import { slugify } from '@/lib/util/slugify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { revalidatePath } from 'next/cache';

export async function updatePlant(plantId: number, formData: FormData) {
  const session = await auth();
  const name = formData.get('name') as string;
  const photo = formData.get('photo') as File;

  if (!name || !session) return;

  const updatePlant = async (opts: { dedupeSlug?: boolean } = {}) =>
    db.plant.update({
      where: { userId: session.user.id, id: +plantId },
      data: {
        displayName: name,
        slug: slugify(name, { addHash: opts.dedupeSlug }),
        ...(photo.size && {
          photo: {
            create: {
              location: await uploadImageToS3(await resizeImage(photo, 1200)),
            },
          },
        }),
      },
    });
  try {
    await updatePlant();
  } catch (e: unknown) {
    if ((e as PrismaClientKnownRequestError).code == 'P2002') {
      await updatePlant({ dedupeSlug: true });
      return;
    }
    throw e;
  }
  revalidatePath('/plants');
}
