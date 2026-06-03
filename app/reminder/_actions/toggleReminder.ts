'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function toggleReminder(id: number, isCompleted: boolean) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  await db.reminder.update({
    where: { id, userId: session.user.id },
    data: { isCompleted },
  });

  revalidatePath('/');
  revalidatePath('/calendar');
}
