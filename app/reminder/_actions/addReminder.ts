'use server';

import { auth } from '@/lib/auth';
import db from '@/lib/db';

export async function createReminder(formData: FormData) {
  'use server';

  const session = await auth();
  const plantId = formData.get('plantId') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const timestamp = formData.get('timestamp') as string;

  if (!session?.user) return;

  const insert = async () =>
    db.reminder.create({
      data: {
        userId: session.user.id,
        title,
        description,
        date: new Date(timestamp),
        plantId: plantId ? +plantId : undefined,
      },
    });
  try {
    return await insert();
  } catch (e: unknown) {
    return new Response('Failed to create reminder', { status: 500 });
  }
}
