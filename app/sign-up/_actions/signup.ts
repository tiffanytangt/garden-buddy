'use server';

import { signIn } from '@/lib/auth';
import db from '@/lib/db';
import { saltAndHash } from '@/lib/password';

export async function signup(
  _currentState: { errorMessage?: string } | undefined,
  formData: FormData
) {
  const username = formData.get('username') as string | undefined;
  const email = formData.get('email') as string | undefined;
  const password = formData.get('password') as string | undefined;
  if (!username || !email || !password) {
    return { errorMessage: 'All fields are required' };
  }
  if (formData.get('password') !== formData.get('confirm_password'))
    return { errorMessage: 'Passwords do not match' };
  try {
    let user;
    user = await db.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (user)
      return {
        errorMessage:
          'A user with that username or email already exists. Please try again.',
      };
    user = await db.user.create({
      data: {
        username,
        email,
        hashed_password: await saltAndHash(password),
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { errorMessage: error.message };
    }
    throw error;
  }
  await signIn('credentials', {
    username: formData.get('username'),
    password: formData.get('password'),
    redirectTo: '/',
  });
}
