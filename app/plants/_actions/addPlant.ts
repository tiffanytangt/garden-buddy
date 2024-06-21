'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { resizeImage } from '@/lib/resize';
import { uploadImageToS3 } from '@/lib/s3';
import { slugify } from '@/lib/util/slugify';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function addPlant(formData: FormData) {
  const session = await auth();
  const name = formData.get('name') as string;
  const photo = formData.get('photo') as File | undefined;

  if (!name || !session) return;

  const createPlant = async (opts: { dedupeSlug?: boolean } = {}) =>
    db.user.update({
      where: { id: session.user.id },
      include: { Plants: true },
      data: {
        Plants: {
          create: {
            displayName: name,
            slug: slugify(name, { addHash: opts.dedupeSlug }),
            ...(photo && {
              photo: {
                create: {
                  location: await uploadImageToS3(
                    await resizeImage(photo, 500)
                  ),
                },
              },
            }),
          },
        },
      },
    });
  try {
    await createPlant();
  } catch (e: unknown) {
    console.log(e);
    if ((e as PrismaClientKnownRequestError).code == 'P2002') {
      await createPlant({ dedupeSlug: true });
    }
  }
}
