'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { revalidatePath } from 'next/cache';

export async function deletePlant(plantId: number) {
  const session = await auth();
  if (!session) {
    throw new Error('Unauthorized');
  }

  try {
    await db.plant.delete({
      where: {
        id: plantId,
        userId: session.user.id,
      },
    });

    // TODO cascade deletes and delete s3 photo
  } catch (e: unknown) {
    if ((e as PrismaClientKnownRequestError).code == 'P2001') {
      throw new Error('Plant not found');
    }
    throw e;
  }
  revalidatePath('/plants');
}
