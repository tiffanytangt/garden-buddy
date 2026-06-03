'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteReminder(id: number) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  await db.reminder.delete({
    where: { id, userId: session.user.id },
  });

  revalidatePath('/');
  revalidatePath('/calendar');
}
