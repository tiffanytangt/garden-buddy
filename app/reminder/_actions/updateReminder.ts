'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateReminder(id: number, formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const timestamp = formData.get('timestamp') as string;

  await db.reminder.update({
    where: { id, userId: session.user.id },
    data: { title, description, date: new Date(timestamp) },
  });

  revalidatePath('/');
  revalidatePath('/calendar');
}
