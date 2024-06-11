import { auth } from '@/lib/auth';
import db from '@/lib/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function addPlant(formData: FormData) {
  'use server';

  const session = await auth();
  const name = formData.get('name')?.toString();

  if (!name || !session) return;
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const insert = (opts: { dedupeSlug?: boolean } = {}) =>
    db.user.update({
      where: { id: session.user.id },
      include: { Plants: true },
      data: {
        Plants: {
          create: {
            displayName: name,
            slug: opts.dedupeSlug
              ? slug + '-' + Math.random().toString(36).substring(2, 8)
              : slug,
          },
        },
      },
    });
  try {
    await insert();
  } catch (e: unknown) {
    console.log(e);
    if ((e as PrismaClientKnownRequestError).code == 'P2002') {
      await insert({ dedupeSlug: true });
    }
  }
}
